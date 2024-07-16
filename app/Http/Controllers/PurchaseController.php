<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function create() {
    
        $products = Product::with('category')->get();

        return Inertia::render('Purchase/Create',[
            'products' => ProductResource::collection($products),
        ]);
    }

    public function store(PurchaseRequest $request) {

        $purchase = Purchase::create([
            'date' => $request->date,
            'supplier' => $request->supplier,
            'supplier_id' => 1, // to do create supplier table
            'payment_method' => $request->payment_method,
            'note' => $request->note,
            'status' => 1,
            'total_quantity' => array_sum(array_column($request->products, 'qty')),
            'total_price' => array_sum(array_column($request->products, 'total_price')),
            'created_by' => Auth::id(),
        ]);

        foreach ($request->products as $product) {
            $purchase->transactions()->create([
                'date' => $request->date,
                'product_id' => $product['product_id'],
                'quantity' => $product['qty'],
                'type' => '+',
                'weight' => $product['weight'],
                'total_weight' => $product['total_weight'],
                'price' => $product['price'],
                'total_price' => $product['total_price'],
                'created_by' => Auth::id(),
            ]);
        }

        return back();
    }
}
