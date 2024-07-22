<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Price;
use App\Models\Product;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        
        $query = Product::query()
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*','categories.name as category_name');

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')) {
            $query->where('products.name','like','%'.request('name').'%');
        }
        if(request('category')) {
            $query->where('category_id','=',request('category'));
        }
        
        $products = $query->orderBy($sortFields, $sortDirection)
                        ->paginate(10)
                        ->onEachSide(1);

        return Inertia::render('Product/Index',[
            'products' => ProductResource::collection($products),
            'queryParams' => request()->query() ?: null,
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Product/Create',[
            'categories' => CategoryResource::collection($categories),
            'success' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
        $data = $request->validated();

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category,
            'unit' => $request->unit,
            'code' => $request->code,
            'weight' => $request->weight ?? 0,
            'created_by' => Auth::id(),
        ]);

        if($request->price>0){
            
            $price = Price::create([
                'product_id' => $product->id,
                'price' => $request->price,
                'price_type' => 1,
                'start_date' => Carbon::now()->format('Y-m-d'),
                'status' => 1,
                'created_by' => Auth::id(),
            ]);

            $price_sale = Price::create([
                'product_id' => $product->id,
                'price' => $request->price_sale,
                'price_type' => 2,
                'start_date' => Carbon::now()->format('Y-m-d'),
                'status' => 1,
                'created_by' => Auth::id(),
            ]);
        }

        return to_route('product.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();

        return Inertia::render('Product/Edit',  [
            'product' => (new ProductResource($product)),
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        
        $product->update([
                'name' => $request->name, 
                'description' => $request->description, 
                'category_id' => $request->category,
                'unit' => $request->unit,
                'weight' => $request->weight,
                'code' => $request->code,
            ]);

        return to_route('product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product_id = $product->id;

        Product::findOrFail($product_id)->delete();
        
        return back();
    }

    public function store_price(Request $request)
    {
        $product_id = $request->product_id;
        $price_purchase = $request->price_purchase;
        $price_sale = $request->price_sale;


        if($price_purchase > 0) {
            
            $last_price = Price::where('product_id',$product_id)->where('price_type',1)->where('status',1)
                                ->update([
                                    'status' => 0,
                                    'end_date' => Carbon::now()->format('Y-m-d'),
                                    'updated_by' => Auth::id(),
                                ]);
            
            $price = Price::create([
                'product_id' => $product_id,
                'price' => $price_purchase,
                'price_type' => 1,
                'start_date' => Carbon::now()->format('Y-m-d'),
                'status' => 1,
                'created_by' => Auth::id(),
            ]);
        }

        if($price_sale > 0) {
            
            $last_price = Price::where('product_id',$product_id)->where('price_type',2)->where('status',1)
                                ->update([
                                    'status' => 0,
                                    'end_date' => Carbon::now()->format('Y-m-d'),
                                    'updated_by' => Auth::id(),
                                ]);
            
            $price = Price::create([
                'product_id' => $product_id,
                'price' => $price_sale,
                'price_type' => 2,
                'start_date' => Carbon::now()->format('Y-m-d'),
                'status' => 1,
                'created_by' => Auth::id(),
            ]);
        }

        return back()->with('success', 'Harga berhasil diubah!');
    }
}
