<?php

namespace App\Modules\Vehicle\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleBrand extends Model
{
    protected $fillable = ['name', 'logo_path'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }
}
