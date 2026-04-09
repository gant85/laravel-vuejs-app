# Azure Entra ID Authentication Implementation

This document describes the complete Azure Entra ID (formerly Azure Active Directory) authentication implementation for the Showcase Application.

## Overview

The application uses **Laravel Socialite** with the **Microsoft provider** to enable OAuth2/OIDC authentication via Azure Entra ID. Users can log in with their Microsoft work or school accounts.

## Features

✅ **Single Sign-On (SSO)** - Login with Microsoft Azure Entra ID  
✅ **OAuth2/OIDC Flow** - Secure authentication flow  
✅ **User Provisioning (JIT)** - Automatic user creation on first login  
✅ **Proactive Provisioning** - Admin-initiated explicit Graph API invitations  
✅ **Strategic RBAC** - Stores `entra_groups` and `entra_roles` tracking App Roles and Memberships
✅ **Token Management** - Access and refresh tokens stored securely  
✅ **Profile Sync** - Name, email, and avatar synced from Azure  
✅ **OpenTelemetry Tracing** - Full observability for auth flows  
✅ **Session Management** - Secure logout with session invalidation

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

The baseline migration `0001_01_01_000000_create_users_table.php` has been configured to include:

```php
$table->string('azure_id')->nullable()->unique();
$table->text('azure_token')->nullable();
$table->text('azure_refresh_token')->nullable();
$table->string('avatar')->nullable();
$table->json('entra_groups')->nullable();
$table->json('entra_roles')->nullable();
$table->string('provisioning_source')->default('jit');
$table->string('password')->nullable(); // Password not required for Azure users
```

All fragmented user additions have been consolidated into the bootstrap table structure for clean CI deployments.

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
    'entra_groups', 'entra_roles', 'provisioning_source',
];
```

The `entra_groups` and `entra_roles` properties are automatically cast to JSON arrays:

```php
protected function casts(): array
{
    return [
        'entra_groups' => 'array',
        'entra_roles' => 'array',
    ];
}
```

#### 4. Microsoft Graph Service & Admin Controllers

**Files**:

- `app/Services/MicrosoftGraphService.php`
- `app/Http/Controllers/AdminUserController.php`

**Features**:
Provides the API interactions mapped to Entra ID Strategy A (One App per API registration) acting over App-Only Token via Client Credentials to control Entra groups efficiently:

- App-Only Microsoft Graph Token mapping locally.
- Sending direct email invitations from Entra ID (`MicrosoftGraphService::inviteUser()`).
- Adding/Removing backend group memberships programmatically directly on Azure side.

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
- ✅ `app/Http/Controllers/AdminUserController.php` (created)
- ✅ `app/Services/MicrosoftGraphService.php` (created)
- ✅ `app/Providers/AzureAuthServiceProvider.php` (created)
- ✅ `app/Models/User.php` (updated)
- ✅ `database/migrations/0001_01_01_000000_create_users_table.php` (updated and consolidated)
- ✅ `app/Http/Middleware/HandleInertiaRequests.php` (updated)
- ✅ `routes/web.php` (updated to include `api/admin/users`)
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
