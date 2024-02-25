<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
// route::get('/edit/{id}');
route::put('/edit/{id}',[ProductController::class,'update']);
route::get('/detail/{id}');
route::get('/product/{id}',[ProductController::class,'show']);


// Route::get('/profileuser',[ProfileController::class,'profile'])->name('profile');

require __DIR__.'/auth.php';
