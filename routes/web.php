<?php

use Illuminate\Support\Facades\Route;

Route::get('{any}', function () {
    return view('app');
});


// Catch-all rota en sonda olmalı
Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');
