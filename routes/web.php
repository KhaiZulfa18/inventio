<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/','/dashboard');

Route::get('/home', [HomeController::class, 'index'])->name('home');    

Route::middleware(['auth','verified'])->group(function (){

    Route::get('/dashboard', fn() => Inertia::render('Dashboard') )->name('dashboard');
   
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
    });
    
    Route::resource('user',UserController::class);
    Route::resource('role',RoleController::class);
    Route::resource('permission',PermissionController::class);
   
    Route::resource('category',CategoryController::class);
    Route::resource('product',ProductController::class);

    Route::controller(PurchaseController::class)->group(function () {
        Route::prefix('/purchase')->group(function () {
            Route::get('/', 'index')->name('purchase.index');
            Route::get('/show/{code}', 'detail')->name('purchase.show');
            Route::get('/create', 'create')->name('purchase.create');
            Route::post('/store', 'store')->name('purchase.store');
        });
    });
});

require __DIR__.'/auth.php';
