<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'unit' => $this->unit,
            'weight' => (!empty($this->weight)) ? number_format($this->weight,2) : null,
            'code' => $this->code,
            'price' => $this->activePrice,
            'category' => new CategoryResource($this->category),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'), 
            'created_by' => new UserResource($this->createdBy),
        ];
    }
}
