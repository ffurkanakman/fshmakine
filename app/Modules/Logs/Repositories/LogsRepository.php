<?php

namespace App\Modules\Logs\Repositories;

use App\Modules\Logs\Models\Logs;

class LogsRepository
{
    public function all()
    {
        return Logs::all();
    }

    public function paginate($perPage = 15)
    {
        return Logs::paginate($perPage);
    }

    public function find($id)
    {
        return Logs::findOrFail($id);
    }

    public function create(array $data)
    {
        return Logs::create($data);
    }

    public function update($id, array $data)
    {
        $model = Logs::findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        $model = Logs::findOrFail($id);
        return $model->delete();
    }
}