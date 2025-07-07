<?php

namespace App\Modules\Vehicle\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'brand_id'    => 'required|string',
            'model'       => 'required|string',
            'type'        => 'required|string',
            'product'     => 'required|string',
            'description' => 'nullable|string',

            'cover_image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',

            'images.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',

            'specifications' => 'nullable|array',
            'specifications.*.key' => 'required|string',
            'specifications.*.value' => 'required|string',
        ];
    }
}
