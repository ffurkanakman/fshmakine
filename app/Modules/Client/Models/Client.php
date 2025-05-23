<?php

namespace App\Modules\Client\Models;

use App\Modules\Servis\Models\Servis;
use Illuminate\Database\Eloquent\Model;


class Client extends Model
{


    protected $table = 'clients';
    protected $fillable = [
        'company_name',
        'authorized_person',
        'phone',
        'address',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function servis()
    {
        return $this->hasMany(Servis::class);
    }
}
