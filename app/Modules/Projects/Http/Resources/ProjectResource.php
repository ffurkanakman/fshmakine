<?php

namespace App\Modules\Projects\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
//            'company_name' => $this->company_name,
//            'authorized_person' => $this->authorized_person,
            'machine_info' => $this->machine_info,
            'project_type' => $this->project_type,
            'price' => $this->price,
            'status' => $this->status,
            'notes' => $this->notes,
            'done_jobs' => $this->done_jobs,
            'client' => $this->when($this->client, function () {
                return [
                    'id' => $this->client->id,
                    'company_name' => $this->client->company_name,
                    'authorized_person' => $this->client->authorized_person,
                ];
            }),
            'sales_person' => $this->when($this->salesPerson, function () {
                return [
                    'id' => $this->salesPerson->id,
                    'name' => $this->salesPerson->name,
                ];
            }),
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}
