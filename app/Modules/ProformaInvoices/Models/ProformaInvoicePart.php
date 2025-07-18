<?php

namespace App\Modules\ProformaInvoices\Models;

use App\Modules\Projects\Models\ProjectPart;
use Illuminate\Database\Eloquent\Model;

class ProformaInvoicePart extends Model
{
    protected $table = 'proforma_invoice_parts';

    protected $fillable = ['proforma_invoice_id', 'part_id'];

    public function ProformaInvoices()
    {
        return $this->belongsTo(ProformaInvoices::class, 'proforma_invoice_id');
    }

    public function part()
    {
        return $this->belongsTo(ProjectPart::class, 'part_id');
    }
}

