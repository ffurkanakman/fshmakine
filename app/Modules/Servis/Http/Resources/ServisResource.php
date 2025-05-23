<?php

namespace App\Modules\Servis\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServisResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'code'              => $this->code,
            'company_name'      => $this->client?->company_name,
            'authorized_person' => $this->client?->authorized_person,
            'machine_info'      => $this->machine_info,
            'service_type'      => $this->service_type,
            'price'             => $this->price,
            'status'            => $this->status,
            'sales_person'      => $this->sales_person?->name . ' ' . $this->sales_person?->surname,
            'notes'             => $this->notes,
            'done_jobs'         => $this->done_jobs,
            'created_at'        => $this->created_at?->format('Y-m-d H:i'),
        ];
    }
}
