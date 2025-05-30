<?php

namespace App\Modules\User\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'surname',
        'phone_number',
        'email',
        'email_verified_at',
        'password',
        'status',
        'role',
    ];



    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'status' => 'boolean',
    ];

    /**
     * Set the user's status.
     *
     * @param  string|bool  $value
     * @return void
     */
    public function setStatusAttribute($value)
    {
        if (is_string($value)) {
            $this->attributes['status'] = $value === 'active' ? 1 : 0;
        } else {
            $this->attributes['status'] = $value ? 1 : 0;
        }
    }
}
