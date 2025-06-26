<?php

namespace App\Modules\SalesOffer\Observers;

use App\Modules\SalesOffer\Models\SalesOffer;

class SalesOfferObserver
{
    public function created(SalesOffer $model)
    {
        // Oluşturma işlemi gözlemlendi
    }

    public function updated(SalesOffer $model)
    {
        // Güncelleme işlemi gözlemlendi
    }

    public function deleted(SalesOffer $model)
    {
        // Silme işlemi gözlemlendi
    }
}