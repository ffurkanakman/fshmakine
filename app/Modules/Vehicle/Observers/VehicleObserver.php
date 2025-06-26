<?php

namespace App\Modules\Vehicle\Observers;

use App\Modules\Vehicle\Models\Vehicle;

class VehicleObserver
{
    public function created(Vehicle $model)
    {
        // Oluşturma işlemi gözlemlendi
    }

    public function updated(Vehicle $model)
    {
        // Güncelleme işlemi gözlemlendi
    }

    public function deleted(Vehicle $model)
    {
        // Silme işlemi gözlemlendi
    }
}