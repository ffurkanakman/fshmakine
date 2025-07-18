<?php

namespace App\Modules\ProformaInvoices\Observers;

use App\Modules\ProformaInvoices\Models\ProformaInvoices;

class ProformaInvoicesObserver
{
    public function created(ProformaInvoices $model)
    {
        // Oluşturma işlemi gözlemlendi
    }

    public function updated(ProformaInvoices $model)
    {
        // Güncelleme işlemi gözlemlendi
    }

    public function deleted(ProformaInvoices $model)
    {
        // Silme işlemi gözlemlendi
    }
}