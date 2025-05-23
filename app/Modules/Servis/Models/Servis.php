<?php

namespace App\Modules\Servis\Models;

use Illuminate\Database\Eloquent\Model;

class Servis extends Model
{

    protected $table = 'servis';
    protected $fillable = [
        'code',
        'company_name',
        'authorized_person',
        'machine_info',
        'service_type',
        'price',
        'status',
        'notes',
        'done_jobs',
        'client_id',
        'sales_person_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // İlişkiler:

    public function client()
    {
        return $this->belongsTo(\App\Modules\Client\Models\Client::class);
    }

    public function salesPerson()
    {
        return $this->belongsTo(\App\Modules\User\Models\User::class, 'sales_person_id');
    }
}
