# Test API Login with Sanctum
# This script demonstrates how to log in via the API and use the token

$baseUrl = "http://localhost:8000"

Write-Host "Testing Sanctum API Authentication" -ForegroundColor Cyan
Write-Host ""

# 1. Login and get token
Write-Host "1. POST /api/login - Getting authentication token..." -ForegroundColor Yellow

$loginBody = @{
    email = "test@example.com"
    password = "password"
    device_name = "chrome-extension"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/login" `
        -Method Post `
        -Body $loginBody `
        -ContentType "application/json"
    
    $token = $loginResponse.token
    Write-Host "✓ Login successful!" -ForegroundColor Green
    Write-Host "Token: $($token.Substring(0, 40))..." -ForegroundColor Gray
    Write-Host "User: $($loginResponse.user.name) ($($loginResponse.user.email))" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Login failed: $_" -ForegroundColor Red
    Write-Host "Make sure you have a user with email 'test@example.com' and password 'password'" -ForegroundColor Yellow
    Write-Host "You can create one with: php artisan tinker" -ForegroundColor Yellow
    Write-Host '  User::factory()->create(["email" => "test@example.com", "password" => Hash::make("password")])' -ForegroundColor Gray
    exit
}

# 2. Get user info with token
Write-Host "2. GET /api/user - Fetching authenticated user..." -ForegroundColor Yellow

try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Accept" = "application/json"
    }
    
    $userResponse = Invoke-RestMethod -Uri "$baseUrl/api/user" `
        -Method Get `
        -Headers $headers
    
    Write-Host "✓ User retrieved successfully!" -ForegroundColor Green
    Write-Host "User ID: $($userResponse.id)" -ForegroundColor Gray
    Write-Host "Name: $($userResponse.name)" -ForegroundColor Gray
    Write-Host "Email: $($userResponse.email)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Failed to get user: $_" -ForegroundColor Red
}

# 3. Get user via /me endpoint
Write-Host "3. GET /api/me - Using /me endpoint..." -ForegroundColor Yellow

try {
    $meResponse = Invoke-RestMethod -Uri "$baseUrl/api/me" `
        -Method Get `
        -Headers $headers
    
    Write-Host "✓ /me endpoint works!" -ForegroundColor Green
    Write-Host "User: $($meResponse.user.name)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Failed to get /me: $_" -ForegroundColor Red
}

# 4. Logout (revoke token)
Write-Host "4. POST /api/logout - Revoking token..." -ForegroundColor Yellow

try {
    $logoutResponse = Invoke-RestMethod -Uri "$baseUrl/api/logout" `
        -Method Post `
        -Headers $headers
    
    Write-Host "✓ Logout successful: $($logoutResponse.message)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ Logout failed: $_" -ForegroundColor Red
}

# 5. Try to access protected route with revoked token (should fail)
Write-Host "5. GET /api/user - Testing with revoked token (should fail)..." -ForegroundColor Yellow

try {
    $failResponse = Invoke-RestMethod -Uri "$baseUrl/api/user" `
        -Method Get `
        -Headers $headers `
        -ErrorAction Stop
    
    Write-Host "✗ Unexpected: Token still works after logout!" -ForegroundColor Red
} catch {
    Write-Host "✓ Token correctly revoked (401 Unauthorized)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Test completed!" -ForegroundColor Cyan
