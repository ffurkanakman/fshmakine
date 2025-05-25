<?php

namespace App\Http\Controllers;

use App\Models\PasswordReset;

use App\Modules\User\Http\Requests\UserRequest;
use App\Modules\User\Models\User;

use App\Traits\Loggable;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    use Loggable;

    const INCORRECT_CREDENTIALS = 'The provided credentials are incorrect.';


    protected function generateToken(User $user)
    {
        return $user->createToken('auth_token')->plainTextToken;
    }

    /**
     * Kullanıcı girişi yapma
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Kullanıcıyı bul
        $user = User::where('email', $request->email)->first();

        // login
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => self::INCORRECT_CREDENTIALS,
                'error_code' => 'AUTH_INVALID_CREDENTIALS',
                'details' => 'Please check your email and password and try again.',
            ], 401);
        }

        // Kullanıcı doğruysa token oluştur ve döndür
        $token = $this->generateToken($user);

        return response()->json([
            'token' => $token,
            'user' => $user->only([
                'id',
                'name',
                'surname',
                'phone_number',
                'email',
                'status',
                'role'
            ])

        ]);
    }

    // Kullanıcı çıkışı (API üzerinden logout işlemi)
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens->each(function ($token) {
            $token->delete();
        });

        $this->logInfo('User logged out', ['user_id' => $user->id]);

        return $this->successResponse(null, 200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20|unique:users,phone_number',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role ?? 'user',
        ]);

        $token = $this->generateToken($user);

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $token,
        ], 201);
    }


    /**
     * Şifre sıfırlama isteği
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            $this->logWarning('Forgot password validation failed', ['errors' => $validator->errors()]);
            return $this->validationErrorResponse($validator->errors());
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $this->logWarning('Forgot password attempt for non-existent email', ['email' => $request->email]);
            return $this->notFoundResponse('Email not found');
        }

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            ['token' => $token, 'created_at' => now()]
        );

        // Frontend URL for password reset
        $resetUrl = env('APP_URL') . '/Kullanici/SifreyiSifirla?token=' . $token . '&email=' . urlencode($user->email);

        $this->logInfo('Password reset email sent', ['user_id' => $user->id]);

        // Test amaçlı JSON mail içerik formatı
        $mailContent = [
            'subject' => 'Şifre Sıfırlama Talebi',
            'message' => 'Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:',
            'reset_link' => $resetUrl,
        ];

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset link has been sent to your email.',
            'email_content' => $mailContent
        ]);
    }

    public function adminRequest(UserRequest $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Giriş yapılmamış ❌'], 401);
        }

        if ($user->admin_request_status === 'bekliyor') {
            return response()->json(['message' => 'Zaten bekleyen bir isteğiniz var.'], 400);
        }

        $user->update(['admin_request_status' => 'bekliyor']);

        return response()->json(['message' => 'Admin olma isteğiniz alındı. Onay bekleniyor 😌']);
    }
    public function listPendingAdminRequests(UserRequest $request)
    {
        if (auth()->user()->type !== 'super_admin') {
            return response()->json(['message' => 'Yetkisiz erişim ❌'], 403);
        }

        $users = User::where('admin_request_status', 'bekliyor')->get();

        return response()->json($users);
    }

    public function approveAdmin(UserRequest $request, $id)
    {
        if (auth()->user()->type !== 'super_admin') {
            return response()->json(['message' => 'Yetkisiz erişim ❌'], 403);
        }

        $user = User::findOrFail($id);
        $user->update([
            'type' => 'admin',
            'admin_request_status' => 'onaylandı'
        ]);

        return response()->json(['message' => 'Kullanıcı admin yapıldı 🫡']);
    }

    public function rejectAdmin(UserRequest $request, $id)
    {
        if (auth()->user()->type !== 'super_admin') {
            return response()->json(['message' => 'Yetkisiz erişim ❌'], 403);
        }

        $user = User::findOrFail($id);
        $user->update(['admin_request_status' => 'reddedildi']);

        return response()->json(['message' => 'Admin isteği reddedildi ❌']);
    }
    /**
     * Authenticated user password change
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',              // Mevcut şifre
            'new_password' => 'required|string|confirmed|min:8', // Yeni şifre + onay
        ]);

        if ($validator->fails()) {
            $this->logWarning('Password change validation failed', ['errors' => $validator->errors()]);
            return $this->validationErrorResponse($validator->errors());
        }

        $user = auth()->user(); // Giriş yapan kullanıcıyı alıyoruz

        // Mevcut şifre doğru mu kontrolü
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Mevcut şifre yanlış',
                'error_code' => 'AUTH_WRONG_PASSWORD',
                'details' => 'Girdiğiniz mevcut şifre hatalı.',
            ], 401);
        }

        // Yeni şifreyi güncelle
        $user->password = Hash::make($request->new_password);
        $user->save();

        $this->logInfo('Password changed successfully', ['user_id' => $user->id]);

        return $this->successResponse(null, 200); // İsteğe göre mesaj da dönebilir
    }

    /**
     * Reset password with token (for forgotten passwords)
     */
    public function resetPasswordWithToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            $this->logWarning('Password reset validation failed', ['errors' => $validator->errors()]);
            return $this->validationErrorResponse($validator->errors());
        }

        // Check if token exists and is valid
        $resetRecord = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$resetRecord) {
            $this->logWarning('Invalid password reset token', [
                'email' => $request->email,
                'token' => $request->token
            ]);

            return response()->json([
                'message' => 'Geçersiz veya süresi dolmuş token',
                'error_code' => 'AUTH_INVALID_TOKEN',
                'details' => 'Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.',
            ], 400);
        }

        // Check if token is not expired (1 hour)
        $tokenCreatedAt = Carbon::parse($resetRecord->created_at);
        if ($tokenCreatedAt->diffInHours(now()) > 1) {
            $this->logWarning('Expired password reset token', [
                'email' => $request->email,
                'token' => $request->token,
                'created_at' => $tokenCreatedAt
            ]);

            return response()->json([
                'message' => 'Şifre sıfırlama bağlantısının süresi dolmuş',
                'error_code' => 'AUTH_EXPIRED_TOKEN',
                'details' => 'Şifre sıfırlama bağlantısının süresi dolmuş. Lütfen yeni bir bağlantı talep edin.',
            ], 400);
        }

        // Find user and update password
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $this->logWarning('User not found for password reset', ['email' => $request->email]);
            return $this->notFoundResponse('Email not found');
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the token after successful reset
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        $this->logInfo('Password reset successfully', ['user_id' => $user->id]);

        return response()->json([
            'status' => 'success',
            'message' => 'Şifreniz başarıyla sıfırlandı. Şimdi giriş yapabilirsiniz.'
        ]);
    }


    /**
     * Access token'ı yenileme
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refreshToken(Request $request)
    {
        try {
            $user = auth()->user();

            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized',
                    'error_code' => 'AUTH_UNAUTHORIZED',
                    'details' => 'User not authenticated.',
                ], 401);
            }

            // Mevcut token'ı sil
            $request->user()->currentAccessToken()->delete();

            // Yeni token oluştur
            $newToken = $this->generateToken($user);

            $this->logInfo('Token refreshed successfully', ['user_id' => $user->id]);

            return response()->json([
                'token' => $newToken,
                'user' => $user->only(['code', 'avatar', 'email', 'phone', 'role', 'status', 'name']),
                'message' => 'Token refreshed successfully'
            ]);

        } catch (\Exception $e) {
            $this->logError('Token refresh failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'message' => 'Token refresh failed',
                'error_code' => 'AUTH_REFRESH_FAILED',
                'details' => 'An error occurred while refreshing the token.',
            ], 500);
        }
    }

    /**
     * Kullanıcı profilini güncelleme
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'required|max:15|unique:users,phone,' . auth()->id(),
            'address' => 'required',
            'type' => 'sometimes|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . auth()->id(),
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            $this->logWarning('Profile update validation failed', [
                'user_id' => auth()->id(),
                'errors' => $validator->errors()
            ]);

            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = auth()->user();

            $user->update([
                'name' => $request->name,
                'surname' => $request->surname,
                'phone' => $request->phone,
                'address' => $request->address,
                'type' => $request->type ?? $user->type,
                'email' => $request->email,
                'role' => $request->role ?? $user->role,
            ]);

            if ($request->has('password') && $request->password) {
                $user->password = bcrypt($request->password);
                $user->save();
            }

            $this->logInfo('Profile updated successfully', [
                'user_id' => $user->id,
                'updated_fields' => $request->only(['name', 'surname', 'phone', 'address', 'type', 'email', 'role'])
            ]);

            return response()->json([
                'message' => 'Profile updated successfully',
                'data' => $user->only(['name', 'surname', 'phone', 'address', 'type', 'email', 'role']),
                'success' => true
            ]);
        } catch (\Exception $e) {
            $this->logError('Profile update failed', [
                'user_id' => auth()->id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Profile update failed',
                'error_code' => 'PROFILE_UPDATE_FAILED',
                'details' => 'An error occurred while updating the profile.',
            ], 500);
        }
    }
}
