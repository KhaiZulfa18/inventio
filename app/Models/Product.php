<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'category_id', 'unit', 'weight', 'code', 'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at'];

    public function category() 
    {
        return $this->belongsTo(Category::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class,'created_by');
    }

    public function prices()
    {
        return $this->hasMany(Price::class,'product_id');
    }

    public function activePurchasePrice()
    {
        return $this->hasOne(Price::class,'product_id')
                ->where('status','1')
                ->where('price_type','1');
    }

    public function activeSalePrice()
    {
        return $this->hasOne(Price::class,'product_id')
                ->where('status','1')
                ->where('price_type','2');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
