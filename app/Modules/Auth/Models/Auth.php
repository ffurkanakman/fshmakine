<?php

namespace App\Modules\Auth\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Auth extends Model
{
    use SoftDeletes;

    protected $table = 'auths';
    protected $fillable = ['name'];
    protected $dates = ['deleted_at'];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}