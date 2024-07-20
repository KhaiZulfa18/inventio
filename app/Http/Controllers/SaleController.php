<?php

namespace App\Http\Controllers;

use App\Helpers\CodeHelper;
use App\Http\Requests\SaleRequest;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Supplier;
use App\Http\Resources\ProductResource;
use App\Http\Resources\PurchaseResource;
use App\Http\Resources\SaleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index() {
        
        $query = Sale::query()
            ->select('sales.*');

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('code')) {
            $query->where('code','like','%'.request('code').'%');
        }
        if(request('customer')) {
            $query->where('customer_id','=',request('customer'));
        }
        
        $sales = $query->orderBy($sortFields, $sortDirection)
                        ->paginate(10)
                        ->onEachSide(1);

        $suppliers = Supplier::all();

        return Inertia::render('Sale/Index',[
            'sales' => SaleResource::collection($sales),
            'queryParams' => request()->query() ?: null,
            'suppliers' => $suppliers,
        ]);
    }

    public function create() {
    
        $products = Product::with('category')->get();
        $suppliers = Supplier::all();

        return Inertia::render('Sale/Create',[
            'products' => ProductResource::collection($products),
            'suppliers' => $suppliers,
        ]);
    }

    public function store(SaleRequest $request) {

        $supplier = Supplier::find($request->supplier);
        $code = CodeHelper::generateCode('sale',$request->date);

        if(!$supplier){
            $supplier = Supplier::create([
                'name' => $request->customer,
                'address' => '',
                'phone_number' => '',
                'created_by' => Auth::id(),
            ]);
        }

        $sale = Sale::create([
            'date' => $request->date,
            'code' => $code,
            'customer' => $supplier->name,
            'customer_id' => $supplier->id,
            'payment_method' => $request->payment_method,
            'note' => $request->note,
            'status' => 1,
            'total_quantity' => array_sum(array_column($request->products, 'qty')),
            'total_price' => array_sum(array_column($request->products, 'total_price')),
            'discount' => $request->discount,
            'created_by' => Auth::id(),
        ]);

        foreach ($request->products as $product) {
            $sale->transactions()->create([
                'date' => $request->date,
                'product_id' => $product['product_id'],
                'quantity' => $product['qty'],
                'type' => '-',
                'weight' => $product['weight'],
                'total_weight' => $product['total_weight'],
                'price' => $product['price'],
                'total_price' => $product['total_price'],
                'created_by' => Auth::id(),
            ]);
        }

        return back()->with('success', 'Penjualan berhasil disimpan, Kode Penjualan ' . $code);
    }
}
