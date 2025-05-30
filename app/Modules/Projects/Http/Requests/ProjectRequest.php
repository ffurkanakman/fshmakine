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

            // Vehicle information fields
            'brand' => ['sometimes', 'string', 'max:255'],
            'model' => ['sometimes', 'string', 'max:255'],
            'serial_number' => ['sometimes', 'string', 'max:255'],
            'chassis_number' => ['sometimes', 'string', 'max:255'],
            'hours' => ['sometimes', 'integer', 'min:0'],
            'model_year' => ['sometimes', 'integer', 'min:1900', 'max:2100'],
            'photos' => ['sometimes', 'array'],
            'photos.*' => ['sometimes', 'string'],
            'vehiclePhotos' => ['sometimes', 'array'],
            'vehiclePhotos.*' => ['sometimes'],

            // Support for camelCase field names from frontend
            'serialNumber' => ['sometimes', 'string', 'max:255'],
            'chassisNumber' => ['sometimes', 'string', 'max:255'],
            'modelYear' => ['sometimes', 'integer', 'min:1900', 'max:2100'],

            // Parts data
            'parts' => ['sometimes', 'array'],
            'parts.*.name' => ['sometimes', 'string', 'max:255'],
            'parts.*.quantity' => ['sometimes', 'numeric', 'min:0'],
            'parts.*.unit_price' => ['sometimes', 'numeric', 'min:0'],
            'parts.*.total_price' => ['sometimes', 'numeric', 'min:0'],
            'parts.*.unitPrice' => ['sometimes', 'numeric', 'min:0'],
            'parts.*.totalPrice' => ['sometimes', 'numeric', 'min:0'],
        ];

        // If this is an update request (PUT/PATCH), make some fields optional
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['machine_info'] = ['sometimes', 'string', 'max:255'];
            $rules['project_type'] = ['sometimes', 'string', 'max:100'];
        }

        return $rules;
    }
}
