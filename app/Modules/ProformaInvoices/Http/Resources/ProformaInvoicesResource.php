<?php

namespace App\Modules\ProformaInvoices\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProformaInvoicesResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'proforma_no' => $this->proforma_no,
            'company_name' => $this->company_name,
            'authorized_person' => $this->authorized_person,
            'address' => $this->address,
            'tax_office' => $this->tax_office,
            'email' => $this->email,
            'delivery_time' => $this->delivery_time,
            'delivery_place' => $this->delivery_place,
            'payment' => $this->payment,
            'warranty' => $this->warranty,
            'origin' => $this->origin,
            'gtip_no' => $this->gtip_no,
            'bank_info' => $this->bank_info,
            'account_name' => $this->account_name,
            'iban' => $this->iban,
            'total_price' => $this->total_price,
            'parts' => $this->whenLoaded('parts', function () {
                return $this->parts->map(function ($p) {
                    return [
                        'id' => $p->part->id,
                        'name' => $p->part->name,
                        'quantity' => $p->part->quantity,
                        'unit_price' => $p->part->unit_price,
                        'total_price' => $p->part->total_price,
                    ];
                });
            }),
            'created_at' => $this->created_at?->toDateTimeString(),
        ];
    }


}
