<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
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

    public function movement() 
    {
        $categories = Category::all();

        return Inertia::render('Stock/Movement',[
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function movement_data(Request $request)
    {
        $date = $request->query('date');
        $category = $request->query('category_id');   

        $startDate = $date['startDate'];
        $endDate = $date['endDate'];

        $startStock = Transaction::select(
            'product_id',
            DB::raw('SUM(CASE WHEN `type` = "+" THEN quantity ELSE -quantity END) as in_start')
        )
        ->whereNull('deleted_at')
        ->where('date', '<', $startDate)
        ->groupBy('product_id');


        $movementStock = Transaction::select('product_id', 
                DB::raw('SUM(CASE WHEN `type` = "+" THEN quantity ELSE 0 END) as in_stock'),
                DB::raw('SUM(CASE WHEN `type` = "+" AND purchase_id IS NOT NULL THEN quantity ELSE 0 END) as in_purchase'),
                DB::raw('SUM(CASE WHEN `type` = "+" AND purchase_id IS NULL THEN quantity ELSE 0 END) as in_manual'),
                DB::raw('SUM(CASE WHEN `type` = "-" THEN quantity ELSE 0 END) as out_stock'),
                DB::raw('SUM(CASE WHEN `type` = "-" AND sale_id IS NOT NULL THEN quantity ELSE 0 END) as out_sale'),
                DB::raw('SUM(CASE WHEN `type` = "-" AND sale_id IS NULL THEN quantity ELSE 0 END) as out_manual'))
            ->when($category, function ($query,$category) {
                return $query->whereHas('product', function ($query) use ($category) {
                    $query->whereIn('category_id',$category);
                }); 
            })
            ->whereBetween('date', [$startDate,$endDate])
            ->groupBy('product_id');

        $data = Product::leftJoinSub($startStock, 'start_stock', function ($join) {
            $join->on('products.id', '=', 'start_stock.product_id');
        })
        ->leftJoinSub($movementStock, 'movements', function ($join) {
            $join->on('products.id', '=', 'movements.product_id');
        })
        ->when($category, function($query, $category) { 
            $query->whereIn('category_id', $category);
        })
        ->havingRaw('(ifnull(in_start,0) + ifnull(in_stock,0) + ifnull(out_stock,0)) > 0')
        ->get();

        $reportData = $data->map(function ($item) use ($date) {
            return [
                'product_id' => $item->product_id,
                'product_name' => $item->name,
                'category_id' => $item->category_id,
                'category_name' => $item->category->name,
                'product_price' => $item->activePrice->price,
                'unit' => $item->unit,
                'weight' => $item->weight,
                'in_start' => (int) $item->in_start,
                'in' => (int) $item->in_stock,
                'in_purchase' => (int) $item->in_purchase,
                'in_manual' => (int) $item->in_manual,
                'out' => (int) $item->out_stock,
                'out_sale' => (int) $item->out_sale,
                'out_manual' => (int) $item->out_manual,
                'remaining_stock' => ( $item->in_start + $item->in_stock - $item->out_stock ),
            ];
        });

        return response()->json([
            'status' => 200,
            'message' => 'Movement Stock data retrieved successfully',
            'data' => $reportData
        ], 200);
    }

    public function card() 
    {
        $products = Product::all();

        return Inertia::render('Stock/Card',[
            'products' => ProductResource::collection($products),
        ]);
    }

    public function card_data(Request $request, Product $product)
    {
        $date = $request->query('date');

        $startDate = $date['startDate'];
        $endDate = $date['endDate'];
        
        $startStock = Transaction::select(
            'product_id',
            DB::raw('SUM(CASE WHEN `type` = "+" THEN quantity ELSE -quantity END) as in_start')
        )
        ->whereNull('deleted_at')
        ->where('date', '<', $startDate)
        ->where('product_id', $product->id)
        ->groupBy('product_id');

        $transaction = Transaction::where('product_id',$product->id)
                ->whereBetween('date', [$startDate,$endDate])
                ->get();
        
        return $product;
    }
}
