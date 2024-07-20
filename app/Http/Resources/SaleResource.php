<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $status = ['Canceled','Process','Done'];

        return [
            'id' => $this->id,
            'date' => $this->date,
            'code' => $this->code,
            'note' => $this->note,
            'customer' => $this->customer,
            'customer_id' => $this->customer_id,
            'total_quantity' => $this->total_quantity,
            'total_price' => $this->total_price,
            'discount' => $this->discount,
            'total' => ($this->total_price - $this->discount),
            'payment_method' => ucfirst($this->payment_method),
            'status' => $status[$this->status],
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'), 
            'created_by' => new UserResource($this->createdBy),
            'transactions' => $this->transactions,
        ];
    }
}
