<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'code', 'supplier', 'supplier_id', 'total_quantity', 'total_price', 'discount', 'payment_method', 'note', 'status', 'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at'];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function supplier()
    {
        return $this->hasOne(Supplier::class);
    }
}
