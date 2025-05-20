<?php

namespace App\Modules\Servis\Repositories;

use App\Modules\Servis\Models\Servis;

class ServisRepository
{
    public function all()
    {
        return Servis::orderByDesc('created_at')->get();
    }

    public function paginate($perPage = 15)
    {
        return Servis::orderByDesc('created_at')->paginate($perPage);
    }

    public function find($id)
    {
        return Servis::findOrFail($id);
    }

    public function create(array $data)
    {
        return Servis::create($data);
    }

    public function update($id, array $data)
    {
        $servis = $this->find($id);
        $servis->update($data);
        return $servis;
    }

    public function delete($id)
    {
        $servis = $this->find($id);
        return $servis->delete();
    }

    public function updateStatus($id, string $status)
    {
        $servis = $this->find($id);
        $servis->update(['status' => $status]);
        return $servis;
    }
}
