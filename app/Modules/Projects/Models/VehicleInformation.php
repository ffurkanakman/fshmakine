<?php

namespace App\Modules\Projects\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleInformation extends Model
{
    protected $table = 'vehicle_information';

    protected $fillable = [
        'project_id',
        'brand',
        'model',
        'serial_number',
        'chassis_number',
        'hours',
        'model_year',
        'photos',
    ];

    protected $casts = [
        'photos' => 'array',
        'hours' => 'integer',
        'model_year' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships:

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
