# Azure Entra ID Authentication Implementation

This document describes the complete Microsoft Entra ID (formerly Azure Active Directory) authentication implementation for the Showcase Application, following **Strategy A** (one API App Registration per domain) from the IT Architecture Guidelines.

## Overview

The application uses **Laravel Socialite** with the **Microsoft provider** to implement an OIDC Authorization Code + PKCE flow. Laravel acts as the **BFF (Backend for Frontend)**: it exchanges the auth code for access/refresh tokens, reads identity claims (roles, groups) directly from the JWT, performs JIT user provisioning, and issues an HttpOnly session cookie to the Vue SPA. The SPA never sees raw tokens.

## Authentication Strategy

Following **Strategy A — One API App Registration per Domain**:

- The BFF has its own **API App Registration** (resource) that defines `access_as_user` scope and app roles.
- The BFF is also registered as a **client app** to authenticate users.
- App roles (e.g. `Hospital.User`, `SuperUser`) are defined on the API app registration and assigned to users/groups via the enterprise application.
- Roles are read from the JWT `roles` claim; group memberships from the `groups` claim — no extra Graph API call needed per request.

## Features

✅ **Single Sign-On (SSO)** — Login with Microsoft Entra ID (OIDC)  
✅ **JIT Provisioning** — Automatic user creation on first login  
✅ **Admin Pre-Provisioning** — Administrator can create users before their first login  
✅ **JWT Claims Extraction** — `roles` and `groups` decoded from the access token at login  
✅ **Token Shield** — Access/Refresh tokens stored server-side only; SPA receives only HttpOnly session cookie  
✅ **Automatic Token Refresh** — BFF transparently refreshes expired access tokens  
✅ **Profile Sync** — Name, email, and avatar synced from Entra ID  
✅ **OpenTelemetry Tracing** — Full observability for all auth flows  
✅ **Session Security** — Secure logout with session invalidation and token regeneration

---

## Login Sequence (FEAT-LOGIN-USERS)

```
User → Browser → GET /login
              → GET /auth/azure  (BFF redirects to Entra ID OIDC endpoint)
User authenticates with Entra ID credentials
Entra ID → BFF  GET /auth/azure/callback?code=...
BFF → Entra ID  Exchange code for Access Token + Refresh Token + ID Token
BFF: decode JWT → extract roles[], groups[]
BFF → DB: does user exist? (azure_id lookup)
  ├─ YES (admin pre-provisioning): update profile + refresh claims
  └─ NO  (first login, JIT):       create new user record
BFF: store Refresh Token in DB (encrypted at rest)
BFF → Browser: Set-Cookie: laravel_session (HttpOnly)
Browser → Inertia SPA: authenticated, session cookie in subsequent requests
```

See also: [sequence-feat-login-users.puml](../sequence-feat-login-users.puml)

---

## Prerequisites

1. **Azure Account** — Access to Azure Portal
2. **Entra ID Tenant** — Organisation's Azure AD tenant
3. **Two App Registrations** — One for the BFF client, one for the API resource (Strategy A)

---

## Azure Portal Setup

### Step 1: Create the API App Registration (Resource)

This registration defines the API surface, scopes, and app roles.

1. Azure Portal → **Microsoft Entra ID** → **App registrations** → **New registration**
2. Name: `Showcase-API`
3. Supported account types: `Accounts in this organizational directory only (Single tenant)`
4. Click **Register**
5. Go to **Expose an API** → Set Application ID URI: `api://showcase-api`
6. Add scope:
   - Scope name: `access_as_user`
   - Who can consent: `Admins and users`
   - Admin consent display name: `Access Showcase API as the signed-in user`
7. Go to **App roles** and create the roles your application needs, e.g.:
   - `Hospital.User` — allowed member types: **Users/Groups + Applications**
   - `SuperUser` — allowed member types: **Users/Groups + Applications**

### Step 2: Create the BFF Client App Registration

1. Azure Portal → **App registrations** → **New registration**
2. Name: `Showcase-BFF`
3. Supported account types: `Single tenant`
4. Redirect URI (Web): `http://localhost:8000/auth/azure/callback`
5. Click **Register**
6. Go to **Certificates & secrets** → **New client secret** → copy the value immediately → `AZURE_CLIENT_SECRET`
7. Go to **API permissions** → **Add a permission** → **My APIs** → `Showcase-API` → Delegated → `access_as_user`
8. Also add **Microsoft Graph** → Delegated: `User.Read`, `profile`, `email`, `openid`
9. Click **Grant admin consent**
10. Copy: **Application (client) ID** → `AZURE_CLIENT_ID`, **Directory (tenant) ID** → `AZURE_TENANT_ID`

### Step 3: Enable Group Claims (Optional)

To populate the JWT `groups` claim:

1. In the BFF app registration → **Token configuration** → **Add groups claim**
2. Select **Security groups**, token types: **ID**, **Access**, **SAML**
3. Click **Add**

> ⚠️ If a user belongs to more than 200 groups, Entra will not inline the claim and you must call the Graph API. For most deployments, inline claims are sufficient.

### Step 4: Assign Roles to Users/Groups

In the **enterprise application** of `Showcase-API`:

1. **Users and groups** → **Add user/group**
2. Select the user or group → select the role (e.g. `Hospital.User`)
3. Click **Assign**

> Roles are always assigned on the **enterprise application** (service principal), never on the client app registration.

---

## Application Configuration

### Environment Variables

```env
# Microsoft Entra ID — BFF Client Registration
AZURE_CLIENT_ID=<BFF client app client-id>
AZURE_CLIENT_SECRET=<BFF client app secret>
AZURE_TENANT_ID=<directory tenant-id>
AZURE_REDIRECT_URI=http://localhost:8000/auth/azure/callback
```

**Production:**

```env
AZURE_REDIRECT_URI=https://your-domain.com/auth/azure/callback
```

---

## Database Schema

### `users` table — Entra ID fields

| Column                | Type    | Description                              |
| --------------------- | ------- | ---------------------------------------- |
| `azure_id`            | varchar | Entra object ID (unique per user)        |
| `azure_token`         | text    | Current access token (server-side only)  |
| `azure_refresh_token` | text    | Refresh token for transparent renewal    |
| `avatar`              | text    | Profile picture URL from Entra ID        |
| `entra_roles`         | json    | App role values from JWT `roles` claim   |
| `entra_groups`        | json    | Group object-IDs from JWT `groups` claim |

**Migrations**:

- `2026_01_15_200919_add_azure_fields_to_users_table`
- `2026_04_09_000000_add_entra_claims_to_users_table`

---

## Implementation Details

### Backend Components

#### 1. Authentication Controller

**File**: `app/Http/Controllers/Auth/AzureAuthController.php`

```
redirectToAzure()        → redirect to Entra ID OIDC endpoint
handleAzureCallback()    → exchange code for tokens, extract claims, JIT provision, issue session
logout()                 → invalidate session, regenerate CSRF token
decodeTokenClaims(jwt)   → base64-decode JWT payload to read roles + groups claims
```

**JIT vs Pre-provisioning logic**:

```php
$existingUser = User::where('azure_id', $azureUser->getId())->first();

if ($existingUser) {
    // Admin pre-provisioning path — update and refresh Entra claims
    $existingUser->update([...entra_roles, entra_groups...]);
} else {
    // JIT provisioning path — create local record on first login
    User::create([...entra_roles, entra_groups...]);
}

Auth::login($user, true); // Issue HttpOnly session cookie
```

**JWT claim extraction** (no Graph API call needed):

```php
private function decodeTokenClaims(string $jwt): array
{
    $parts = explode('.', $jwt);
    $payload = base64_decode(strtr($parts[1], '-_', '+/'));
    return json_decode($payload, true) ?? [];
}
// $roles  = $claims['roles']  ?? [];
// $groups = $claims['groups'] ?? [];
```

#### 2. User Model

**File**: `app/Models/User.php`

```php
protected $fillable = [
    'name', 'email', 'password', 'azure_id',
    'azure_token', 'azure_refresh_token', 'avatar',
    'entra_groups', 'entra_roles',           // NEW
];

protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'entra_groups'      => 'array',      // NEW
        'entra_roles'       => 'array',      // NEW
    ];
}

public function hasRole(string $role): bool { ... }
public function inGroup(string $group): bool { ... }
```

#### 3. Shared Inertia Data

**File**: `app/Http/Middleware/HandleInertiaRequests.php`

Roles and groups are shared globally so every Vue page can access them:

```php
'auth' => [
    'user' => $request->user() ? [
        'id'           => $request->user()->id,
        'name'         => $request->user()->name,
        'email'        => $request->user()->email,
        'avatar'       => $request->user()->avatar,
        'entra_roles'  => $request->user()->entra_roles ?? [],   // NEW
        'entra_groups' => $request->user()->entra_groups ?? [],  // NEW
    ] : null,
],
```

#### 4. Routes

**File**: `routes/web.php`

```php
Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
Route::get('/auth/azure', [AzureAuthController::class, 'redirectToAzure'])->name('azure.login');
Route::get('/auth/azure/callback', [AzureAuthController::class, 'handleAzureCallback'])->name('azure.callback');
Route::post('/logout', [AzureAuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
});
```

### Frontend Components

#### Login Page

**File**: `resources/js/Pages/Auth/Login.vue`

- Material Design 3 UI (Vuetify + Material Symbols icons)
- Single "Sign in with Microsoft" button → `window.location.href = '/auth/azure'`
- No credentials ever entered in the SPA

#### Dashboard — Identity Panel

**File**: `resources/js/Pages/Dashboard.vue`

Displays the authenticated user's Entra identity information using UI-kit components:

```typescript
const authUser = (page.props.auth as any)?.user as {
  entra_roles: string[];
  entra_groups: string[];
  // ...
} | null;
```

- **Entra ID Roles** panel — `Label` chips (`color="brand"`) for each app role
- **Entra ID Groups** panel — `Label` chips (`color="info"`) for each group membership

#### TypeScript Auth Interface Pattern

```typescript
// pages receive entra_roles and entra_groups via Inertia shared props
const page = usePage<{
  auth: { user: { entra_roles: string[]; entra_groups: string[] } | null };
}>();
```

---

## Token & Session Lifecycle

| Step           | Actor  | Detail                                                             |
| -------------- | ------ | ------------------------------------------------------------------ |
| Auth code flow | Entra  | Authorization Code + PKCE; redirect to BFF callback                |
| Token exchange | BFF    | BFF exchanges code for Access Token + Refresh Token server-side    |
| Claims read    | BFF    | `roles` and `groups` decoded from access token JWT payload         |
| Tokens stored  | BFF→DB | Encrypted at rest in PostgreSQL; never sent to browser             |
| Session issued | BFF    | HttpOnly `laravel_session` cookie; SPA sends on every request      |
| Token refresh  | BFF    | On expiry, BFF uses Refresh Token silently before forwarding calls |
| Logout         | BFF    | Session invalidated; CSRF token regenerated                        |

---

## Security Considerations

### ✅ Implemented Security Features

1. **Token Shield** — access/refresh tokens never leave the server
2. **HttpOnly Session Cookie** — SPA cannot access the session token via JS
3. **CSRF Protection** — Inertia.js sends `X-XSRF-TOKEN` on every request
4. **Audience Isolation** — BFF requests tokens scoped to `api://showcase-api/access_as_user` (Strategy A)
5. **Session Invalidation** — Full session + CSRF regeneration on logout
6. **Least-Privilege Scopes** — only `User.Read`, `profile`, `email`, `openid`, `access_as_user`

### 🔒 Production Recommendations

```env
APP_ENV=production
APP_DEBUG=false
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
```

- Always HTTPS in production (required by Entra for non-localhost redirect URIs)
- Pre-consent all API permissions via admin consent — users never see consent prompts
- Add `AZURE_TENANT_ID=<your-tenant-guid>` to restrict to your organisation only

---

## API Permissions Summary

| Permission       | Type      | Description                             | App Registration |
| ---------------- | --------- | --------------------------------------- | ---------------- |
| `openid`         | Delegated | Sign users in                           | Showcase-BFF     |
| `profile`        | Delegated | View basic profile                      | Showcase-BFF     |
| `email`          | Delegated | View email address                      | Showcase-BFF     |
| `User.Read`      | Delegated | Read signed-in user's profile           | Showcase-BFF     |
| `access_as_user` | Delegated | Call Showcase API as the signed-in user | Showcase-BFF     |

App roles (`Hospital.User`, `SuperUser`, …) are defined on `Showcase-API` and **assigned** on its enterprise application.

---

## Troubleshooting

### "Client credentials are invalid"

Verify `AZURE_CLIENT_ID` / `AZURE_CLIENT_SECRET`. Run `php artisan config:clear` inside Docker.

### "Redirect URI mismatch"

Ensure `AZURE_REDIRECT_URI` in `.env` exactly matches the URI registered in Entra (including scheme and port).

### "Invalid state"

Session or CSRF mismatch. Clear browser cookies and restart the auth flow.

### `roles` / `groups` arrays are empty after login

- Verify app roles are defined on the `Showcase-API` registration and assigned to the user via the enterprise application.
- Verify the `groups` claim is enabled in **Token configuration** of the BFF registration.
- Inspect the raw JWT at https://jwt.ms.

### Users not being created

Run `docker exec reference-app-laravel-vue-php php artisan migrate` and check DB connectivity.

---

## OpenTelemetry Tracing

| Span                  | Description                       |
| --------------------- | --------------------------------- |
| `azure.auth.redirect` | User initiates login              |
| `azure.auth.callback` | OAuth callback + JIT provisioning |
| `azure.auth.logout`   | User logs out                     |

View traces: Jaeger UI → http://localhost:16686 → service `showcase-backend`

---

## Files Changed

### Backend

| File                                                                        | Change    |
| --------------------------------------------------------------------------- | --------- |
| `app/Http/Controllers/Auth/AzureAuthController.php`                         | Rewritten |
| `app/Models/User.php`                                                       | Updated   |
| `app/Http/Middleware/HandleInertiaRequests.php`                             | Updated   |
| `database/migrations/2026_04_09_000000_add_entra_claims_to_users_table.php` | New       |

### Frontend

| File                                | Change    |
| ----------------------------------- | --------- |
| `resources/js/Pages/Auth/Login.vue` | No change |
| `resources/js/Pages/Dashboard.vue`  | Updated   |

---

## Related Documentation

- [IT Architecture Guidelines — Authentication and Authorization with Microsoft Entra ID](../docs/ARCHITECTURE.md)
- [Feature: Login & User Provisioning](../FEAT-LOGIN-USERS.md)
- [Azure Entra ID Documentation](https://learn.microsoft.com/en-us/entra/identity/)
- [Laravel Socialite](https://laravel.com/docs/socialite)
- [OAuth 2.0 Authorization Code Flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)

---

## Prerequisites

Before enabling Azure Entra ID authentication, you need:

1. **Azure Account** - Access to Azure Portal
2. **Azure Entra ID Tenant** - Organization's Azure AD tenant
3. **App Registration** - Registered application in Azure Portal

---

## Azure Portal Setup

### Step 1: Register Application

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
4. Configure the app:
   - **Name**: `Showcase Application`
   - **Supported account types**: `Accounts in this organizational directory only (Single tenant)`
   - **Redirect URI**:
     - Platform: `Web`
     - URI: `http://localhost:8000/auth/azure/callback` (for local dev)
     - For production, use your app URL: `https://your-domain.com/auth/azure/callback`
5. Click **Register**

### Step 2: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Delegated permissions**
5. Add the following permissions:
   - `User.Read` - Read user profile
   - `profile` - View users' basic profile
   - `email` - View users' email address
   - `openid` - Sign users in
6. Click **Add permissions**
7. Click **Grant admin consent** (requires admin privileges)

### Step 3: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Configure:
   - **Description**: `Showcase App Secret`
   - **Expires**: Choose appropriate expiration (e.g., 24 months)
4. Click **Add**
5. **⚠️ IMPORTANT**: Copy the **Value** immediately (it won't be shown again)

### Step 4: Copy Configuration Values

From **Overview** page, copy:

- **Application (client) ID** → `AZURE_CLIENT_ID`
- **Directory (tenant) ID** → `AZURE_TENANT_ID`
- **Client secret value** (from step 3) → `AZURE_CLIENT_SECRET`

---

## Application Configuration

### 1. Update Environment Variables

Edit `apps/showcase/.env` and add:

```env
# Azure Entra ID (Azure Active Directory) Configuration
AZURE_CLIENT_ID=your-application-client-id
AZURE_CLIENT_SECRET=your-client-secret-value
AZURE_TENANT_ID=your-directory-tenant-id
AZURE_REDIRECT_URI=http://localhost:8000/auth/azure/callback
```

**Production Configuration:**

```env
AZURE_REDIRECT_URI=https://your-production-domain.com/auth/azure/callback
```

### 2. Verify Database Migration

The migration adds these fields to `users` table:

```php
$table->string('azure_id')->nullable()->unique();
$table->string('azure_token')->nullable();
$table->string('azure_refresh_token')->nullable();
$table->text('avatar')->nullable();
$table->string('password')->nullable()->change(); // Password not required for Azure users
```

Migration already run: `2026_01_15_200919_add_azure_fields_to_users_table`

---

## Implementation Details

### Backend Components

#### 1. Authentication Controller

**File**: `app/Http/Controllers/Auth/AzureAuthController.php`

**Methods**:

- `redirectToAzure()` - Redirects user to Microsoft login
- `handleAzureCallback()` - Processes OAuth callback and creates/updates user
- `logout()` - Logs user out and invalidates session

**Features**:

- OpenTelemetry tracing for all auth operations
- Automatic user provisioning (creates user on first login)
- Secure token storage
- Error handling with user-friendly messages

#### 2. Service Provider

**File**: `app/Providers/AzureAuthServiceProvider.php`

Registers the Microsoft Socialite provider with Laravel.

#### 3. User Model

**File**: `app/Models/User.php`

Updated to include Azure-specific fields:

```php
protected $fillable = [
    'name', 'email', 'password',
    'azure_id', 'azure_token', 'azure_refresh_token', 'avatar',
];
```

#### 4. Configuration

**File**: `config/services.php`

```php
'microsoft' => [
    'client_id' => env('AZURE_CLIENT_ID'),
    'client_secret' => env('AZURE_CLIENT_SECRET'),
    'tenant' => env('AZURE_TENANT_ID', 'common'),
    'redirect' => env('AZURE_REDIRECT_URI'),
],
```

#### 5. Routes

**File**: `routes/web.php`

```php
// Public routes
Route::get('/login', ...)->name('login');
Route::get('/auth/azure', [AzureAuthController::class, 'redirectToAzure']);
Route::get('/auth/azure/callback', [AzureAuthController::class, 'handleAzureCallback']);

// Protected routes (require authentication)
Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index']);
    Route::post('/logout', [AzureAuthController::class, 'logout']);
});
```

### Frontend Components

#### 1. Login Page

**File**: `resources/js/Pages/Auth/Login.vue`

**Features**:

- Material Design 3 UI with Vuetify
- Single "Sign in with Microsoft" button
- Setup instructions for first-time configuration
- Responsive design

#### 2. User Menu (Dashboard)

**File**: `resources/js/Pages/Dashboard.vue`

**Features**:

- User avatar (from Azure or initials)
- User name and email display
- Logout button
- Dropdown menu with Vuetify

#### 3. Shared Data Middleware

**File**: `app/Http/Middleware/HandleInertiaRequests.php`

Shares authenticated user data across all Inertia pages:

```php
'auth' => [
    'user' => $request->user() ? [
        'id' => $request->user()->id,
        'name' => $request->user()->name,
        'email' => $request->user()->email,
        'avatar' => $request->user()->avatar,
    ] : null,
],
```

---

## Testing Authentication

### 1. Start Application

```bash
# Ensure Docker containers are running
pnpm docker:up

# Start Vite dev server
pnpm dev
```

### 2. Access Login Page

Navigate to: http://localhost:8000/login

### 3. Click "Sign in with Microsoft"

You'll be redirected to Microsoft login page.

### 4. Authenticate

- Enter your Microsoft work/school account credentials
- Grant permissions when prompted

### 5. Callback Handling

After successful authentication, you'll be redirected to the dashboard with:

- Your name displayed in the welcome message
- User avatar in the top-right corner
- Logout option in user menu

---

## Security Considerations

### ✅ Implemented Security Features

1. **Client Secret Protection**
   - Never exposed to frontend
   - Stored in `.env` (not committed to Git)
   - Used only server-side

2. **Token Security**
   - Access tokens stored in database (encrypted at rest)
   - Refresh tokens stored securely
   - Tokens hidden from API responses

3. **CSRF Protection**
   - Laravel's built-in CSRF protection
   - Logout requires POST request with CSRF token

4. **Session Security**
   - Session invalidation on logout
   - Token regeneration after logout
   - HttpOnly cookies

5. **Route Protection**
   - All app routes require authentication (`auth` middleware)
   - Public access only to login and OAuth callback

### 🔒 Additional Recommendations

1. **Production Configuration**:

   ```env
   APP_ENV=production
   APP_DEBUG=false
   SESSION_SECURE_COOKIE=true
   SESSION_SAME_SITE=lax
   ```

2. **HTTPS Required**:
   - Always use HTTPS in production
   - Azure requires HTTPS for redirect URIs (except localhost)

3. **Token Rotation**:
   - Consider implementing token refresh logic
   - Azure tokens typically expire after 1 hour

4. **Audit Logging**:
   - OpenTelemetry traces all auth events
   - View in Jaeger UI: http://localhost:16686

---

## Troubleshooting

### Error: "Client credentials are invalid"

**Cause**: Incorrect `AZURE_CLIENT_ID` or `AZURE_CLIENT_SECRET`

**Solution**:

1. Verify values in `.env` match Azure Portal
2. Regenerate client secret if expired
3. Clear cache: `php artisan config:clear`

### Error: "Redirect URI mismatch"

**Cause**: Callback URL doesn't match Azure app registration

**Solution**:

1. Check `AZURE_REDIRECT_URI` in `.env`
2. Ensure it matches exactly in Azure Portal (including `http://` or `https://`)
3. For localhost: `http://localhost:8000/auth/azure/callback`

### Error: "AADSTS50011: No reply address"

**Cause**: Redirect URI not configured in Azure

**Solution**:

1. Go to Azure Portal → App registrations → Your app
2. Go to Authentication → Platform configurations → Web
3. Add redirect URI: `http://localhost:8000/auth/azure/callback`

### Error: "Invalid state"

**Cause**: Session expired or CSRF token mismatch

**Solution**:

1. Clear browser cookies
2. Start authentication flow from beginning
3. Check session configuration in `config/session.php`

### Users Not Being Created

**Cause**: Database migration not run or permissions issue

**Solution**:

1. Run migrations: `docker exec reference-app-laravel-vue-php php artisan migrate`
2. Check database connection
3. Verify `users` table has Azure fields

---

## Multi-Tenant Support

By default, the app uses `tenant => 'common'` which allows:

- Work accounts from any Azure AD tenant
- Personal Microsoft accounts

**To restrict to specific tenant**:

```env
AZURE_TENANT_ID=your-specific-tenant-id
```

**To allow only work accounts**:

```env
AZURE_TENANT_ID=organizations
```

**To allow only personal accounts**:

```env
AZURE_TENANT_ID=consumers
```

---

## OpenTelemetry Tracing

All authentication operations are traced:

1. **`azure.auth.redirect`** - User initiates login
2. **`azure.auth.callback`** - OAuth callback processing
3. **`azure.auth.logout`** - User logs out

**View traces**:

1. Open Jaeger UI: http://localhost:16686
2. Select service: `showcase-backend`
3. Search for operation: `azure.auth.*`

**Trace attributes**:

- `user.id` - User ID after successful login
- `user.email` - User email

---

## API Permissions Explained

| Permission | Type      | Description                       | Required |
| ---------- | --------- | --------------------------------- | -------- |
| User.Read  | Delegated | Read the signed-in user's profile | ✅       |
| profile    | Delegated | View user's basic profile         | ✅       |
| email      | Delegated | View user's email address         | ✅       |
| openid     | Delegated | Sign users in and read profile    | ✅       |

**Admin consent required**: Yes (for organizational accounts)

---

## Related Documentation

- [Azure Entra ID Documentation](https://learn.microsoft.com/en-us/entra/identity/)
- [Laravel Socialite](https://laravel.com/docs/socialite)
- [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/)
- [OAuth 2.0 Authorization Code Flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)

---

## Files Modified/Created

### Backend

- ✅ `app/Http/Controllers/Auth/AzureAuthController.php` (created)
- ✅ `app/Providers/AzureAuthServiceProvider.php` (created)
- ✅ `app/Models/User.php` (updated)
- ✅ `database/migrations/2026_01_15_200919_add_azure_fields_to_users_table.php` (created)
- ✅ `app/Http/Middleware/HandleInertiaRequests.php` (updated)
- ✅ `routes/web.php` (updated)
- ✅ `config/services.php` (updated)
- ✅ `bootstrap/app.php` (updated)
- ✅ `.env.example` (updated)

### Frontend

- ✅ `resources/js/Pages/Auth/Login.vue` (created)
- ✅ `resources/js/Pages/Dashboard.vue` (updated)

### Dependencies

- ✅ `laravel/socialite` (installed)
- ✅ `socialiteproviders/microsoft` (installed)

---

## Quick Start Checklist

- [ ] Register app in Azure Portal
- [ ] Configure API permissions and grant admin consent
- [ ] Create client secret
- [ ] Copy `client_id`, `tenant_id`, `client_secret` to `.env`
- [ ] Set `AZURE_REDIRECT_URI` (localhost or production)
- [ ] Run migration: `php artisan migrate`
- [ ] Start Docker: `pnpm docker:up`
- [ ] Start Vite: `pnpm dev`
- [ ] Test login at: http://localhost:8000/login
- [ ] Verify traces in Jaeger: http://localhost:16686

---

**✨ Azure Entra ID authentication is now fully implemented and ready to use!**
