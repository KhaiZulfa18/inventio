<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method = $this->method();

        if($method === 'POST')
            return [
                'date' => 'required|date',
                'customer' => 'required',
                'payment_method' => 'required|string|max:255',
                'note' => 'nullable|string',
                'products' => 'required|array',
                'products.*.product_id' => 'required|integer|exists:products,id', // Assuming you have a products table
                'products.*.qty' => 'required|integer|min:1',
            ];
        else if($method === 'PUT')
            return [
                'date' => 'required|date',
                'customer' => 'required|string|max:255',
                'payment_method' => 'required|string|max:255',
                'note' => 'nullable|string',
            ];
    }
}
