<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Servis\Http\Controllers\ServisController;

Route::group([
    'prefix' => 'api/servis',
    'as'     => 'servis.',
//    'middleware' => ['auth:sanctum'], // Token doğrulama aktif
], static function () {
    Route::get('/', [ServisController::class, 'index'])->name('index');          // Listeleme
    Route::post('/', [ServisController::class, 'store'])->name('store');         // Ekleme
    Route::get('/{id}', [ServisController::class, 'show'])->name('show');        // Detay
    Route::put('/{id}', [ServisController::class, 'update'])->name('update');    // Güncelleme
    Route::delete('/{id}', [ServisController::class, 'destroy'])->name('destroy'); // Silme

    // Ek İşlemler
    Route::put('/{id}/approve', [ServisController::class, 'approve'])->name('approve'); // Onayla
    Route::put('/{id}/reject',  [ServisController::class, 'reject'])->name('reject');   // Reddet
});
