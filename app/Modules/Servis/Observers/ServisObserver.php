<?php

namespace App\Modules\Servis\Observers;

use App\Modules\Servis\Models\Servis;

class ServisObserver
{
    public function created(Servis $model)
    {
        // Oluşturma işlemi gözlemlendi
    }

    public function updated(Servis $model)
    {
        // Güncelleme işlemi gözlemlendi
    }

    public function deleted(Servis $model)
    {
        // Silme işlemi gözlemlendi
    }
}