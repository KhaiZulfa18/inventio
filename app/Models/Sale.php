<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'code', 'customer', 'customer_id', 'total_quantity', 'total_price', 'discount', 'payment_method', 'note', 'status', 'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at'];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function getCustomer()
    {
        return $this->belongsTo(Customer::class);
    }
}
