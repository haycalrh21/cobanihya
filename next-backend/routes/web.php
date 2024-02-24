<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Route::get('/profileuser',[ProfileController::class,'profile'])->name('profile');

require __DIR__.'/auth.php';
