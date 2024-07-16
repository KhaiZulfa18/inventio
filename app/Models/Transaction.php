<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'product_id', 'type', 'quantity', 'weight', 'total_weight', 'price', 'total_price', 'note', 'status', 'sale_id', 'purchase_id', 'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at'];
 
    public function purchase()
    {
        return $this->belongsTo(Purchase::class,'purchase_id');
    }
}
