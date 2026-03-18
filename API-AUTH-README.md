# API Authentication with Sanctum

This application provides API authentication via Laravel Sanctum with **token-based authentication** for external clients like Chrome Extensions or other api-related services.

## Authentication Flow

### 1. Login (`POST /api/login`)

Exchange email/password for a Bearer token.

**Request:**
```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secret",
  "device_name": "chrome-extension" // optional
}
```

**Response (200 OK):**
```json
{
  "token": "1|xyz123abc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

**Error (422 Unprocessable Entity):**
```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["The provided credentials are incorrect."]
  }
}
```

---

### 2. Authenticated Requests

Include the token in the `Authorization` header:

```http
Authorization: Bearer 1|xyz123abc...
```

---

### 3. Get User Info (`GET /api/user` or `GET /api/me`)

**Request:**
```http
GET /api/user
Authorization: Bearer 1|xyz123abc...
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "email_verified_at": "2026-03-18T10:00:00.000000Z",
  "created_at": "2026-01-01T00:00:00.000000Z",
  "updated_at": "2026-03-18T10:00:00.000000Z"
}
```

**Alternative endpoint (`/api/me`):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    ...
  }
}
```

---

### 4. Logout (`POST /api/logout`)

Revoke the current token.

**Request:**
```http
POST /api/logout
Authorization: Bearer 1|xyz123abc...
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Chrome Extension Integration

### Example: Login and Store Token

```javascript
async function loginToAPI(email, password) {
  const response = await fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      device_name: 'chrome-extension',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const data = await response.json();
  
  // Store token in chrome.storage
  await chrome.storage.local.set({ apiToken: data.token, user: data.user });
  
  return data;
}
```

### Example: Make Authenticated Request

```javascript
async function fetchUserData() {
  // Retrieve token from storage
  const { apiToken } = await chrome.storage.local.get('apiToken');
  
  const response = await fetch('http://localhost:8000/api/user', {
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid - redirect to login
      console.error('Unauthorized - please login again');
      return null;
    }
    throw new Error('Failed to fetch user');
  }

  return await response.json();
}
```

### Example: Logout

```javascript
async function logout() {
  const { apiToken } = await chrome.storage.local.get('apiToken');
  
  await fetch('http://localhost:8000/api/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
  });

  // Clear stored token
  await chrome.storage.local.remove(['apiToken', 'user']);
}
```

---

## Testing

### Test Script

Run the included PowerShell test script:

```powershell
./test-api-login.ps1
```

### Manual Testing with cURL

**Login:**
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

**Get User:**
```bash
curl http://localhost:8000/api/user \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Logout:**
```bash
curl -X POST http://localhost:8000/api/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Security Notes

1. **HTTPS in Production**: Always use HTTPS in production to prevent token interception.

2. **Token Storage**: In your Chrome Extension, store tokens securely in `chrome.storage.local` (not `localStorage` or cookies).

3. **CORS**: If your extension runs on a different origin, configure CORS in `config/cors.php` or use a manifest V3 host permission.

4. **Rate Limiting**: Login is rate-limited to 5 attempts per minute per email/IP (configured in `FortifyServiceProvider`).

5. **Token Rotation**: The API deletes old tokens for the same device before creating a new one to prevent token buildup.

6. **SANCTUM_STATEFUL_DOMAINS**: Only needed for cookie/session-based SPA auth. Your Chrome Extension will use Bearer tokens, so this doesn't apply.

---

## Configuration

### Environment Variables

Add to your `.env`:

```env
# Already configured - no changes needed for token auth
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000
```

### Token Expiration (Optional)

Edit `config/sanctum.php` to set token expiration:

```php
'expiration' => 60 * 24, // Tokens expire after 24 hours (in minutes)
```

---

## Shared Credentials

✅ **Users can log in via both:**
- Web UI: `/login` (Fortify, session-based)
- API: `/api/login` (Sanctum, token-based)

Both use the same `users` table, so credentials are identical.

---

## Next Steps

1. **Test the API** with the provided test script or manually.
2. **Update your Chrome Extension** to use the `/api/login` endpoint.
3. **Configure CORS** if needed (see `config/cors.php`).
4. **Deploy** with the updated `.github/workflows/deploy.yml`.
