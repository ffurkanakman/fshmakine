<?php

namespace App\Modules\ProformaInvoices\Models;

use App\Modules\Projects\Models\ProjectPart;
use Illuminate\Database\Eloquent\Model;


class ProformaInvoices extends Model
{


    protected $table = 'proforma_invoices';
    protected $fillable = [
        'proforma_no',
        'company_name',
        'address',
        'tax_office',
        'authorized_person',
        'email',
        'delivery_time',
        'delivery_place',
        'payment',
        'warranty',
        'origin',
        'gtip_no',
        'bank_info',
        'account_name',
        'iban',
        'total_price'
    ];


    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function parts()
    {
        return $this->hasMany(ProformaInvoicePart::class, 'proforma_invoice_id');
    }
}
