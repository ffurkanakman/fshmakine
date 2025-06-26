<?php

namespace App\Modules\Vehicle\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
{
    public function authorize()
    {
        // Burada yetkilendirme kontrolü ekleyebilirsin.
        return true;
    }

    public function rules()
    {
        return [
            'brand' => 'required|string',
            'model' => 'required|string',
            'type'  => 'required|string',
            'slug'  => 'required|unique:vehicles,slug',
            'description' => 'nullable|string',

            // Çoklu görsel
            'images.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',

            // Teknik özellikler (repeater uyumlu)
            'specifications' => 'nullable|array',
            'specifications.*.key' => 'required|string',
            'specifications.*.value' => 'required|string',
        ];
    }
}
