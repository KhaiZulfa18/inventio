<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
            'created_by' => Auth::id(),
        ]);

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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
