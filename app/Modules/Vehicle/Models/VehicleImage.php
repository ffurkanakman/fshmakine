<?php

namespace App\Modules\Vehicle\Models;

use Illuminate\Database\Eloquent\Model;
use App\Modules\Vehicle\Models\Vehicle; // bu satır eksikti

class VehicleImage extends Model
{
    protected $table = 'vehicle_images';

    protected $fillable = ['vehicle_id', 'image_path'];

    public function vehicle(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}
