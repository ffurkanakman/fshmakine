<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Vehicle\Http\Controllers\VehicleController;

Route::group([
    'prefix' => 'api/vehicle',
    'as' => 'vehicle',
    //    'middleware' => ['auth:sanctum'],
], static function () {
    Route::get('/', [VehicleController::class, 'index'])->name('index'); // Listeleme
    Route::post('/', [VehicleController::class, 'store'])->name('store'); // Ekleme
    Route::get('/{id}', [VehicleController::class, 'show'])->name('show'); // Tekil veri getir
    Route::put('/{id}', [VehicleController::class, 'update'])->name('update'); // Güncelleme
    Route::delete('/{id}', [VehicleController::class, 'destroy'])->name('destroy'); // Silme
});