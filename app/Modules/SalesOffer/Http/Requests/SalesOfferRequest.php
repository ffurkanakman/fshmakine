<?php

namespace App\Modules\SalesOffer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesOfferRequest extends FormRequest
{
    public function authorize()
    {
        // Burada yetkilendirme kontrolü ekleyebilirsin.
        return true;
    }

    public function rules()
    {
        return [
            'vehicle_id' => 'required|exists:vehicles,id',
            'client_name' => 'required|string|max:255',
            'client_authorized' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'mail' => 'required|email|max:255',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'payment_type' => 'required|string|in:Nakit,Havale,Kredi Kartı',
        ];
    }
}
