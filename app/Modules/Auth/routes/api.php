<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Auth\Http\Controllers\AuthController;

Route::group([
    'prefix' => 'api/auth',
    'as' => 'auth',
    //    'middleware' => ['auth:sanctum'],
], static function () {
    Route::get('/', [AuthController::class, 'index'])->name('index'); // Listeleme
    Route::post('/', [AuthController::class, 'store'])->name('store'); // Ekleme
    Route::get('/{id}', [AuthController::class, 'show'])->name('show'); // Tekil veri getir
    Route::put('/{id}', [AuthController::class, 'update'])->name('update'); // Güncelleme
    Route::delete('/{id}', [AuthController::class, 'destroy'])->name('destroy'); // Silme
});