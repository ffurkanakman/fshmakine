<?php

namespace App\Modules\SalesOffer\Http\Resources;

use App\Modules\Vehicle\Http\Resources\VehicleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesOfferResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'vehicle' => $this->whenLoaded('vehicle', function () {
                return new VehicleResource($this->vehicle);
            }),
            'client_name' => $this->client_name,
            'client_authorized' => $this->client_authorized,
            'subject' => $this->subject,
            'mail' => $this->mail,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'payment_type' => $this->payment_type,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
