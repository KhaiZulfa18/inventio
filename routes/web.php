<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/','/dashboard');

Route::get('/home', [HomeController::class, 'index'])->name('home');    

Route::middleware(['auth','verified'])->group(function (){

    Route::get('/dashboard', fn() => Inertia::render('Dashboard') )->name('dashboard');
   
    Route::resource('category',CategoryController::class);
    Route::resource('product',ProductController::class);
    Route::resource('user',UserController::class);
    Route::resource('roles',RoleController::class);
    Route::resource('permissions',RoleController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
