<?php

namespace App\Http\Controllers;

use App\Helpers\CodeHelper;
use App\Http\Requests\PurchaseRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\PurchaseResource;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index() {
        
        $query = Purchase::query()
            ->select('purchases.*');

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('code')) {
            $query->where('code','like','%'.request('code').'%');
        }
        if(request('supplier')) {
            $query->where('supplier_id','=',request('supplier'));
        }
        
        $purchases = $query->orderBy($sortFields, $sortDirection)
                        ->paginate(10)
                        ->onEachSide(1);

        $suppliers = Supplier::all();

        return Inertia::render('Purchase/Index',[
            'purchases' => PurchaseResource::collection($purchases),
            'queryParams' => request()->query() ?: null,
            'suppliers' => $suppliers,
        ]);
    }

    public function create() {
    
        $products = Product::with('category')->get();
        $suppliers = Supplier::all();

        return Inertia::render('Purchase/Create',[
            'products' => ProductResource::collection($products),
            'suppliers' => $suppliers,
        ]);
    }

    public function store(PurchaseRequest $request) {

        $supplier = Supplier::find($request->supplier);
        $code = CodeHelper::generateCode('purchase',$request->date);

        if(!$supplier){
            $supplier = Supplier::create([
                'name' => $request->supplier,
                'address' => '',
                'phone_number' => '',
                'created_by' => Auth::id(),
            ]);
        }

        $purchase = Purchase::create([
            'date' => $request->date,
            'code' => $code,
            'supplier' => $supplier->name,
            'supplier_id' => $supplier->id,
            'payment_method' => $request->payment_method,
            'note' => $request->note,
            'status' => 1,
            'total_quantity' => array_sum(array_column($request->products, 'qty')),
            'total_price' => array_sum(array_column($request->products, 'total_price')),
            'discount' => $request->discount,
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

        return back()->with('success', 'Pembelian berhasil dibuat, Kode Pembelian ' . $code);
    }
}
