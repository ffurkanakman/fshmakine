<?php

namespace App\Modules\Auth\Repositories;

use App\Modules\Auth\Models\Auth;

class AuthRepository
{
    public function all()
    {
        return Auth::all();
    }

    public function paginate($perPage = 15)
    {
        return Auth::paginate($perPage);
    }

    public function find($id)
    {
        return Auth::findOrFail($id);
    }

    public function create(array $data)
    {
        return Auth::create($data);
    }

    public function update($id, array $data)
    {
        $model = Auth::findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        $model = Auth::findOrFail($id);
        return $model->delete();
    }
}