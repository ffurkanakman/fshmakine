<?php

namespace App\Modules\Servis\Models;

use Illuminate\Database\Eloquent\Model;

class Servis extends Model
{

    protected $table = 'servis';
    protected $fillable = [
        'code', 'company_name', 'authorized_person',
        'machine_info', 'service_type', 'price',
        'status', 'sales_person', 'notes', 'done_jobs'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
