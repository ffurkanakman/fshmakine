<?php

namespace App\Modules\Logs\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LogsRequest extends FormRequest
{
    public function authorize()
    {
        // Burada yetkilendirme kontrolü ekleyebilirsin.
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
        ];
    }
}