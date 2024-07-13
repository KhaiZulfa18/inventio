<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    //

    public function create() {
    
        $products = Product::with('category')->get();

        return Inertia::render('Purchase/Create',[
            'products' => ProductResource::collection($products),
        ]);
    }
}
