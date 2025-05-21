<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SmsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Select2Controller;

// /api/v1/ prefix'i ile rotalar
Route::prefix('v1')->group(function () {
    // Kullanıcı Girişi
    Route::post('Giris', [AuthController::class, 'login'])->name('login');
    Route::post('TokenYenile', [AuthController::class, 'refreshToken'])->name('token.refresh')->middleware('auth:sanctum');
    // Kullanıcı kaydı
    Route::post('KayitOl', [AuthController::class, 'register'])->name('register');
    // Kullanıcı çıkışı
    Route::middleware('auth:sanctum')->post('Cikis', [AuthController::class, 'logout'])->name('logout');
    // Giriş yapmış kullanıcıyı döndüren rota
    Route::middleware('auth:sanctum')->get('me', function () {
        return new \App\Modules\User\Http\Resources\UserResource(auth()->user()->load('regionSimple'));
    })->name('me');


    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::middleware('auth:sanctum')->put('reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');

});




