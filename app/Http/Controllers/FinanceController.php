<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseResource;
use App\Http\Resources\SaleResource;
use App\Models\Purchase;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FinanceController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Finance/Index',[
            
        ]);
    }

    public function data(Request $request)
    {
        $date = $request->query('date');
        $category = $request->query('category_id');   

        $startDate = $date['startDate'];
        $endDate = $date['endDate'];

        $purchases = Purchase::whereNull('deleted_at')
            ->whereBetween('date', [$startDate, $endDate]);

        $sales = Sale::whereNull('deleted_at')
            ->whereBetween('date', [$startDate, $endDate]);
        
        $income = $sales->sum(DB::raw('total_price - discount'));
        $outcome = $purchases->sum(DB::raw('total_price - discount'));

        $profitLoss = $income - $outcome;

        $summary = [
            'outcome' => $outcome,
            'income' => $income,
            'profit' => ($profitLoss>0) ? $profitLoss : 0,
            'loss' => ($profitLoss<0) ? abs($profitLoss) : 0,
        ];

        return response()->json([
            'status' => 200,
            'message' => 'Finance data retrieved successfully',
            'data' => [
                'summary' => $summary,
                'purchases' => PurchaseResource::collection($purchases->get()),
                'sales' => SaleResource::collection($sales->get()),
            ],
        ], 200);
    }
}
