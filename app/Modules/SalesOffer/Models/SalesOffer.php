<?php

namespace App\Modules\SalesOffer\Models;

use App\Modules\Vehicle\Models\Vehicle;
use Illuminate\Database\Eloquent\Model;

class SalesOffer extends Model
{
    protected $table = 'sales_offers';

    protected $fillable = [
        'vehicle_id',
        'client_name',
        'client_authorized',
        'quantity',
        'price',
        'payment_type',
        'subject',
        'mail',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
