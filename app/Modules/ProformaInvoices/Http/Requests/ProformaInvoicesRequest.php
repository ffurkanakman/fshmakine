<?php

namespace App\Modules\ProformaInvoices\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProformaInvoicesRequest extends FormRequest
{
    public function authorize()
    {
        // Burada yetkilendirme kontrolü ekleyebilirsin.
        return true;
    }

    public function rules()
    {
        return [
            'proforma_no' => 'required|string|unique:proforma_invoices,proforma_no',
            'company_name' => 'required|string',
            'address' => 'nullable|string',
            'tax_office' => 'nullable|string',
            'authorized_person' => 'nullable|string',
            'email' => 'nullable|email',
            'delivery_time' => 'nullable|string',
            'delivery_place' => 'nullable|string',
            'payment' => 'nullable|string',
            'warranty' => 'nullable|string',
            'origin' => 'nullable|string',
            'gtip_no' => 'nullable|string',
            'bank_info' => 'nullable|string',
            'account_name' => 'nullable|string',
            'iban' => 'nullable|string',
            'part_ids' => 'required|array',
            'part_ids.*' => 'exists:project_parts,id',
        ];
    }
}
