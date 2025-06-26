<?php

use Illuminate\Support\Facades\Route;
use App\Modules\SalesOffer\Http\Controllers\SalesOfferController;

Route::group([
    'prefix' => 'api/salesoffer',
    'as' => 'salesoffer',
    //    'middleware' => ['auth:sanctum'],
], static function () {
    Route::get('/', [SalesOfferController::class, 'index'])->name('index'); // Listeleme
    Route::post('/', [SalesOfferController::class, 'store'])->name('store'); // Ekleme
    Route::get('/{id}', [SalesOfferController::class, 'show'])->name('show'); // Tekil veri getir
    Route::put('/{id}', [SalesOfferController::class, 'update'])->name('update'); // Güncelleme
    Route::delete('/{id}', [SalesOfferController::class, 'destroy'])->name('destroy'); // Silme
});