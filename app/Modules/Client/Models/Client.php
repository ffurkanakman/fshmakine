<?php

namespace App\Modules\Client\Models;

use App\Modules\Projects\Models\Project;
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

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
