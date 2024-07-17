<?php 

namespace App\Helpers;

use App\Models\Purchase;
use App\Models\Sale;
use Carbon\Carbon;

class CodeHelper
{
    public static function generateCode($type,$date)
    {
        $prefix_code = [
            'purchase' => 'PCS',
            'sale' => 'SLE'
        ];

        $date = Carbon::parse($date);

        $month = $date->format('m');
        $year = $date->year;

        if($type=='purchase') 
            $query = new Purchase();
        else if($type=='sale')
            $query = new Sale();

        $data_count = $query->whereYear('date', $year)
                            ->whereMonth('date', $month)
                            ->count() + 1;
        
        $code = sprintf("%s/%02d/%s/%d", $prefix_code[$type], $data_count, $month, $year);

        return $code;
    }   
}
?>