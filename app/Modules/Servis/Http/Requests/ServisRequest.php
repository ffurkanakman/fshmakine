<?php

namespace App\Modules\Servis\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServisRequest extends FormRequest
{
    public function authorize()
    {
        // Burada yetkilendirme kontrolü ekleyebilirsin.
        return true;
    }

    public function rules()
    {
        return [
            'company_name'       => ['required', 'string', 'max:255'],
            'authorized_person'  => ['nullable', 'string'],
            'machine_info'       => ['nullable', 'string'],
            'service_type'       => ['required', 'string'],
            'price'              => ['nullable', 'numeric'],
            'sales_person'       => ['nullable', 'string'],
            'notes'              => ['nullable', 'string'],
            'done_jobs'          => ['nullable', 'string'],
        ];
    }
}
