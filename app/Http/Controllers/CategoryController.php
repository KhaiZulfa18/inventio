<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Category::query();

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')) {
            $query->where('name','like','%'.request('name').'%')
                    ->orWhere('description','like','%'.request('name').'%');
        }
        
        $categories = $query->orderBy($sortFields, $sortDirection)
                        ->paginate(5)
                        ->onEachSide(1);

        return Inertia::render('Category/Index',[
            'categories' => CategoryResource::collection($categories),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Category/Create',[
            'success' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => Auth::id(),
        ]);

        return to_route('category.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Category/Edit',  [
            'category' => (new CategoryResource($category)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update(['name' => $request->name, 'description' => $request->description]);

        return to_route('category.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category_id = $category->id;

        Category::findOrFail($category_id)->delete();
        
        return back();
    }
}
