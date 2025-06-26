<?php

namespace App\Modules\Vehicle\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'model'       => $this->model,
            'type'        => $this->type,
            'slug'        => $this->slug,
            'description' => $this->description,

            // Marka
            'brand' => $this->whenLoaded('brand', function () {
                return [
                    'id' => $this->brand->id,
                    'name' => $this->brand->name,
                    'logo' => asset('storage/' .$this->brand-logo_path),
                ];
            }),

            // Galeri
            'images' => $this->whenLoaded('gallery', function () {
                return $this->gallery->map(function ($image) {
                    return asset('storage/' . $image->image_path);
                });
            }),

            // Dinamik teknik özellikler (repeater uyumlu)
            'specifications' => $this->whenLoaded('specifications', function () {
                return $this->specifications->map(function ($spec) {
                    return [
                        'key'   => $spec->key,
                        'value' => $spec->value,
                    ];
                });
            }),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
