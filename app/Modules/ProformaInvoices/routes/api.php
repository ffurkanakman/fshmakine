<?php

use Illuminate\Support\Facades\Route;
use App\Modules\ProformaInvoices\Http\Controllers\ProformaInvoicesController;

Route::group([
    'prefix' => 'api/proformainvoices',
    'as' => 'proformainvoices',
    //    'middleware' => ['auth:sanctum'],
], static function () {
    Route::get('/', [ProformaInvoicesController::class, 'index'])->name('index'); // Listeleme
    Route::post('/', [ProformaInvoicesController::class, 'store'])->name('store'); // Ekleme
    Route::get('/{id}', [ProformaInvoicesController::class, 'show'])->name('show'); // Tekil veri getir
    Route::put('/{id}', [ProformaInvoicesController::class, 'update'])->name('update'); // Güncelleme
    Route::delete('/{id}', [ProformaInvoicesController::class, 'destroy'])->name('destroy'); // Silme
});