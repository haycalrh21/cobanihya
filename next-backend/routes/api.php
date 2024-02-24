<?php

use App\Http\Controllers\AHPController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/buy', [ProfileController::class, 'profile']);
Route::post('/storeproduct',[ProductController::class,'buy']);
Route::get('/dataproduct',[ProductController::class,'databuy']);
Route::get('ahp',[AHPController::class,'index']);
