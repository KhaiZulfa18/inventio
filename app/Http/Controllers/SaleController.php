<?php

namespace App\Http\Controllers;

use App\Helpers\CodeHelper;
use App\Http\Requests\SaleRequest;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Customer;
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

        $customers = Customer::all();

        return Inertia::render('Sale/Index',[
            'sales' => SaleResource::collection($sales),
            'queryParams' => request()->query() ?: null,
            'customers' => $customers,
        ]);
    }

    public function create() {
    
        $products = Product::with('category')->get();
        $customers = Customer::all();

        return Inertia::render('Sale/Create',[
            'products' => ProductResource::collection($products),
            'customers' => $customers,
        ]);
    }

    public function store(SaleRequest $request) {

        $customer = Customer::find($request->customer);
        $code = CodeHelper::generateCode('sale',$request->date);

        if(!$customer){
            $customer = Customer::create([
                'name' => $request->customer,
                'address' => '',
                'phone_number' => '',
                'created_by' => Auth::id(),
            ]);
        }

        $sale = Sale::create([
            'date' => $request->date,
            'code' => $code,
            'customer' => $customer->name,
            'customer_id' => $customer->id,
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

        return to_route('sale.index')->with('success', 'Penjualan berhasil disimpan, Kode Penjualan ' . $code);
    }

    public function show($code)
    {
        $sale = Sale::with(['transactions','transactions.product'])
                                ->where('code',$code)->first();
        
        return Inertia::render('Sale/Show',[
            'sales' => (new SaleResource($sale)),
        ]);
    }

    public function destroy(Sale $sale) {

        $sale->transactions()->delete();
        $sale->delete();

        return back()->with('success', 'Data berhasil dihapus.');
    }
}
