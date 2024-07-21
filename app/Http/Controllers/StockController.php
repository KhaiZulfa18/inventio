<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockController extends Controller
{
    //

    public function report() 
    {
        $categories = Category::all();

        return Inertia::render('Stock/Report',[
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function report_data(Request $request)
    {
        $date = $request->query('date');
        $category = $request->query('category_id');   

        $data = Transaction::select('product_id', DB::raw('SUM(CASE WHEN type = "+" THEN quantity ELSE -quantity END) as remaining_stock'))
            ->when($category, function ($query,$category) {
                return $query->whereHas('product', function ($query) use ($category) {
                    $query->whereIn('category_id',$category);
                }); 
            })
            ->where('date', '<=', $date)
            ->groupBy('product_id')
            ->get();

        $reportData = $data->map(function ($item) use ($date) {
            return [
                'date' => $date,
                'product_id' => $item->product_id,
                'product_name' => $item->product->name,
                'category_id' => $item->product->category_id,
                'category_name' => $item->product->category->name,
                'product_price' => $item->product->activePrice->price,
                'unit' => $item->product->unit,
                'weight' => $item->product->weight,
                'remaining_stock' => (int) $item->remaining_stock,
                'remaining_stock_weight' => ($item->remaining_stock * $item->product->weight),
            ];
        });

        return response()->json([
            'status' => 200,
            'message' => 'Stock data retrieved successfully',
            'data' => $reportData
        ], 200);
    }
}
