<?php

namespace App\Modules\Auth\Observers;

use App\Modules\Auth\Models\Auth;

class AuthObserver
{
    public function created(Auth $model)
    {
        // Oluşturma işlemi gözlemlendi
    }

    public function updated(Auth $model)
    {
        // Güncelleme işlemi gözlemlendi
    }

    public function deleted(Auth $model)
    {
        // Silme işlemi gözlemlendi
    }
}