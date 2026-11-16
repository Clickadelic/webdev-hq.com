# Test Fixes Summary

## Issues Fixed

### 1. Email Verification Test Failure
- **Test**: `Tests\Feature\Auth\VerificationNotificationTest::sends verification notification`
- **Error**: Expected redirect to `/dashboard`, but got `/`
- **Root Cause**: Fortify's `EmailVerificationNotificationSentResponse` uses `back()` which redirects to the previous page
- **Solution**: 
  - Created custom response class: `App\Http\Responses\EmailVerificationNotificationSentResponse`
  - Registered it in `FortifyServiceProvider` to override Fortify's default
  - Now explicitly redirects to the `dashboard` route instead of using `back()`

### 2. Public Posts Test Failure
- **Test**: `Tests\Feature\PublicPostsTest::public posts page lists only published posts`
- **Error**: Expected 1 post but got 2 (including draft)
- **Root Cause**: `PostController::index()` wasn't filtering posts by published status
- **Solution**: Updated query to use the existing `published()` scope and sort by `published_at`

## CI/CD Improvements

### PHP Memory Limit for Wayfinder Generation
- **Issue**: `php artisan wayfinder:generate` was exhausting 128MB memory limit in CI
- **Solution**: 
  - Updated `.github/workflows/deploy.yml` to use `php -d memory_limit=512M` for wayfinder:generate
  - Added explicit wayfinder:generate step to `.github/workflows/tests.yml` with 512M memory limit
  - This prevents "Allowed memory size exhausted" errors during builds

## Test Results
All previously failing tests now pass:
- ✅ 114 tests passing (after fixes)
- ✅ VerificationNotificationTest: 2 tests passing
- ✅ PublicPostsTest: 1 test passing

## Files Modified
1. `app/Http/Responses/EmailVerificationNotificationSentResponse.php` (new)
2. `app/Http/Controllers/PostController.php`
3. `app/Providers/FortifyServiceProvider.php`
4. `.github/workflows/deploy.yml`
5. `.github/workflows/tests.yml`
