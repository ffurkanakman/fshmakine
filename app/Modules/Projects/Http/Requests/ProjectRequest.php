<?php

namespace App\Modules\Projects\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize()
    {
        // In a real application, you would check if the user is authorized to perform this action
        return true;
    }

    public function rules()
    {
        $rules = [
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
//            'company_name' => ['required', 'string', 'max:255'],
//            'authorized_person' => ['required', 'string', 'max:255'],
            'machine_info' => ['required', 'string', 'max:255'],
            'project_type' => ['required', 'string', 'max:100'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'status' => ['sometimes', 'string', 'in:pending,approved,rejected,in_progress,completed'],
            'notes' => ['sometimes', 'string'],
            'done_jobs' => ['sometimes', 'string'],
            'client_id' => ['sometimes', 'exists:clients,id'],
            'sales_person_id' => ['sometimes', 'exists:users,id'],
        ];

        // If this is an update request (PUT/PATCH), make some fields optional
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['company_name'] = ['sometimes', 'string', 'max:255'];
            $rules['authorized_person'] = ['sometimes', 'string', 'max:255'];
            $rules['machine_info'] = ['sometimes', 'string', 'max:255'];
            $rules['project_type'] = ['sometimes', 'string', 'max:100'];
        }

        return $rules;
    }
}
