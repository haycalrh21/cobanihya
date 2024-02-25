<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/storeproduct',[ProductController::class,'buy']);
Route::get('/dataproduct',[ProductController::class,'databuy']);

Route::get('/kategori',[ProductController::class,'kategori']);
Route::delete('/hapus/{id}',[ProductController::class,'hapus']);
route::patch('/edit/{id}',[ProductController::class,'update']);
route::get('/product/{id}',[ProductController::class,'show']);
