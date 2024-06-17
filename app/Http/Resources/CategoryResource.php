<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'parent_category_id' => $this->parent_category_id,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'), 
            'created_by' => new UserResource($this->createdBy),
        ];
    }
}
