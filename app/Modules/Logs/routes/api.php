<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Logs\Http\Controllers\LogsController;

Route::group([
    'prefix' => 'api/logs',
    'as' => 'logs',
    //    'middleware' => ['auth:sanctum'],
], static function () {
    Route::get('/', [LogsController::class, 'index'])->name('index'); // Listeleme
    Route::post('/', [LogsController::class, 'store'])->name('store'); // Ekleme
    Route::get('/{id}', [LogsController::class, 'show'])->name('show'); // Tekil veri getir
    Route::put('/{id}', [LogsController::class, 'update'])->name('update'); // Güncelleme
    Route::delete('/{id}', [LogsController::class, 'destroy'])->name('destroy'); // Silme
});