<?php

namespace App\Modules\Servis\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServisRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        if ($this->isMethod('post')) {
            return $this->postRules();
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return $this->putRules();
        }

        return [];
    }

    protected function postRules(): array
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

    protected function putRules(): array
    {
        return [
            'company_name'       => ['sometimes', 'string', 'max:255'],
            'authorized_person'  => ['sometimes', 'string'],
            'machine_info'       => ['sometimes', 'string'],
            'service_type'       => ['sometimes', 'string'],
            'price'              => ['sometimes', 'numeric'],
            'sales_person'       => ['sometimes', 'string'],
            'notes'              => ['sometimes', 'string'],
            'done_jobs'          => ['sometimes', 'string'],
        ];
    }
}
