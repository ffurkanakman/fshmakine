<?php

namespace App\Modules\Logs\Traits;

use App\Modules\Logs\Observers\LoggableModelObserver;

trait LogsActivity
{
    public static function bootLogsActivity()
    {
        static::observe(LoggableModelObserver::class);
    }
}
