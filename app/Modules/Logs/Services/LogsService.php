<?php

namespace App\Modules\Logs\Services;

use App\Modules\Logs\Repositories\LogsRepository;

class LogsService
{
    protected $logsRepository;

    public function __construct(LogsRepository $logsRepository)
    {
        $this->logsRepository = $logsRepository;
    }

    public function all()
    {
        return $this->logsRepository->all();
    }

    public function create(array $data)
    {
        return $this->logsRepository->create($data);
    }

    public function find($id)
    {
        return $this->logsRepository->find($id);
    }

    public function update($id, array $data)
    {
        return $this->logsRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->logsRepository->delete($id);
    }

    /**
     * Observer tarafından çağrılacak loglama fonksiyonu.
     */
    public function log(string $event, $model, array $properties = [])
    {
        return $this->logsRepository->create([
            'subject_type' => get_class($model),
            'subject_id'   => $model->id,
            'causer_id'    => auth()->id(),
            'event'        => $event,
            'properties'   => json_encode($properties),
        ]);
    }
}
