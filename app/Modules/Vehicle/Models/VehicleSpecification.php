<?php

namespace App\Modules\Vehicle\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleSpecification extends Model
{
    protected $fillable = ['vehicle_id', 'key', 'value'];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
