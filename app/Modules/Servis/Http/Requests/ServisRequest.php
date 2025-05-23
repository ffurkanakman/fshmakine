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
            'machine_info'      => ['nullable', 'string'],
            'service_type'      => ['required', 'string'],
            'price'             => ['nullable', 'numeric'],
            'status'            => ['required', 'in:bekliyor,onaylandi,reddedildi'],
            'notes'             => ['nullable', 'string'],
            'done_jobs'         => ['nullable', 'string'],
            'client_id'         => ['required', 'exists:clients,id'],
            'sales_person_id'   => ['required', 'exists:users,id'],
        ];
    }

    protected function putRules(): array
    {
        return [
            'code'              => ['sometimes', 'string', 'max:255'],
            'company_name'      => ['sometimes', 'string', 'max:255'],
            'authorized_person' => ['sometimes', 'string', 'max:255'],
            'machine_info'      => ['sometimes', 'string'],
            'service_type'      => ['sometimes', 'string'],
            'price'             => ['sometimes', 'numeric'],
            'status'            => ['sometimes', 'in:bekliyor,onaylandi,reddedildi'],
            'notes'             => ['sometimes', 'string'],
            'done_jobs'         => ['sometimes', 'string'],
            'client_id'         => ['sometimes', 'exists:clients,id'],
            'sales_person_id'   => ['sometimes', 'exists:users,id'],
        ];
    }
}
