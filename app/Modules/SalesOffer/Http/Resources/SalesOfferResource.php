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
            'quantity' => $this->quantity,
            'price' => $this->price,
            'currency' => $this->currency,
            'note' => $this->note,
            'offer_date' => $this->offer_date,
            'created_at' => $this->created_at,
        ];
    }
}
