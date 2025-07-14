<?php

namespace App\Modules\Vehicle\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleBrand extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'logo_path'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }
}
