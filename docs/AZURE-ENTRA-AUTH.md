# Microsoft Entra ID Authentication (Showcase)

This document describes the Entra login and local provisioning flow implemented in the Showcase app.

## What Is Implemented

- OIDC login with Microsoft Entra ID via Laravel Socialite.
- User mapping strategy:
  - Match by `azure_id` when already linked.
  - Fallback to `email` to map admin pre-provisioned users.
- JIT provisioning when user does not exist locally.
- Local snapshot of authorization context from token claims:
  - `entra_groups`
  - `entra_roles`
- Encrypted storage of access/refresh tokens.
- Session-based authentication (HttpOnly cookie), no frontend token handling.

## Login Flow Summary

1. User opens `/login` and clicks "Sign in with Microsoft".
2. App redirects to Entra (`/auth/azure`).
3. Entra callback (`/auth/azure/callback`) returns identity claims and tokens.
4. Backend resolves local user:
   - Existing linked user by `azure_id`, or
   - Existing pre-provisioned user by `email`, or
   - New user created with JIT provisioning.
5. Backend updates profile/token fields, authorization snapshot, login metadata.
6. Laravel session is created and user is redirected to dashboard.

## Database Baseline (Unified)

The users schema is fully consolidated in baseline migration:

- `0001_01_01_000000_create_users_table.php`

Incremental Azure auth migrations were removed because the project starts from zero.

Main auth-related fields on `users`:

- `azure_id` (nullable, unique)
- `azure_token` (nullable text, encrypted cast)
- `azure_refresh_token` (nullable text, encrypted cast)
- `avatar` (nullable text)
- `provisioning_source` (default: `jit`)
- `entra_groups` (nullable json)
- `entra_roles` (nullable json)
- `allowed_pdv_codes` (nullable json)
- `last_login_at` (nullable timestamp)
- `last_login_ip` (nullable string)

## Configuration

Set these values in `apps/showcase/.env`:

```env
AZURE_CLIENT_ID=your-entra-client-id
AZURE_CLIENT_SECRET=your-entra-client-secret
AZURE_TENANT_ID=your-entra-tenant-id
AZURE_REDIRECT_URI=http://localhost:8000/auth/azure/callback

# Optional Graph integration flags for future admin/provisioning operations
AZURE_GRAPH_ENABLED=false
AZURE_GRAPH_DEFAULT_GROUP_ID=
```

## Routes

- `GET /login` -> login page
- `GET /auth/azure` -> redirect to Entra
- `GET /auth/azure/callback` -> callback + local provisioning/link
- `POST /logout` -> logout + session invalidation

## Notes About Roles And PDV

- Application roles remain managed in Entra.
- Local DB stores a snapshot (`entra_roles`, `entra_groups`) used by the BFF and UI.
- PDV scoping can be managed locally through `allowed_pdv_codes`.

## Local Validation

1. Start services with Docker.
2. Run migrations from a clean database.
3. Open `/login` and authenticate with Entra.
4. Confirm user row is created or linked as expected.
5. Confirm user menu shows profile and provisioning source.
