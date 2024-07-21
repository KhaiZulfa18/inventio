<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StockController;
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

    Route::resource('purchase',PurchaseController::class)->except(['show','edit','update']);
    Route::get('purchase/show/{code}', [PurchaseController::class,'show'])->name('purchase.show')->where('code', '.*');

    Route::resource('sale',SaleController::class)->except(['show','edit','update']);
    Route::get('sale/show/{code}', [SaleController::class,'show'])->name('sale.show')->where('code', '.*');

    Route::controller(StockController::class)->group(function () {
        Route::prefix('/stock')->group(function () {
            Route::get('/report', 'report')->name('stock.report');
            Route::get('/report/data', 'report_data')->name('stock.report.data');
            Route::get('/movement', 'movement')->name('stock.movement');
            Route::get('/card', 'card')->name('stock.card');
        });
    });
});

require __DIR__.'/auth.php';
