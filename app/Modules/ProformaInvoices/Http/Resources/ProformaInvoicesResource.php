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
