<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Giriş yapan kullanıcının bilgilerini döner
//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

// Modül route dosyalarını buraya dahil et
require_once base_path('app/Modules/Servis/routes/api.php');
require_once base_path('app/Modules/Auth/routes/api.php');

// Eğer başka modül eklersen buraya da ekle
// require_once base_path('app/Modules/User/routes/api.php');

