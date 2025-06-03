<?php

namespace App\Modules\Logs\Models;

use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    protected $table = 'logs';

    protected $fillable = [
        'subject_type',
        'subject_id',
        'causer_id',
        'event',
        'properties',
    ];

    protected $casts = [
        'properties' => 'array',
    ];

    // Kullanıcı ilişkisi
    public function causer()
    {
        return $this->belongsTo(\App\Modules\User\Models\User::class, 'causer_id');
    }
}
