<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Vehicle\Http\Controllers\VehicleController;
use App\Modules\Vehicle\Http\Controllers\VehicleBrandController;


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
    Route::delete('/{vehicle}/gallery/{image}', [VehicleController::class, 'deleteImage']);
});

// 🏷️ Marka işlemleri
Route::prefix('api/vehicle-brands')->name('vehicle-brands.')->group(function () {
    Route::get('/', [VehicleBrandController::class, 'index'])->name('index');   // Listele
    Route::post('/', [VehicleBrandController::class, 'store'])->name('store');  // Ekle
    Route::get('/{id}', [VehicleBrandController::class, 'show'])->name('show'); // Detay
    Route::put('/{id}', [VehicleBrandController::class, 'update'])->name('update'); // Güncelle
    Route::delete('/{id}', [VehicleBrandController::class, 'destroy'])->name('destroy'); // Sil
});


