<?php

namespace App\Modules\Logs\Observers;

use App\Modules\Logs\Services\LogsService;
use Illuminate\Support\Facades\App;

class LoggableModelObserver
{
    protected LogsService $logsService;

    public function __construct(LogsService $logsService)
    {
        $this->logsService = $logsService;
    }

    public function created($model)
    {
        $this->logsService->log('created', $model, ['after' => $model->toArray()]);
    }

    public function updated($model)
    {
        $changes = [
            'before' => $model->getOriginal(),
            'after' => $model->getChanges()
        ];

        $this->logsService->log('updated', $model, $changes);
    }

    public function deleted($model)
    {
        $this->logsService->log('deleted', $model, ['before' => $model->toArray()]);
    }
}
