<?php

namespace App\Modules\SalesOffer\Repositories;

use App\Modules\SalesOffer\Models\SalesOffer;

class SalesOfferRepository
{
    public function all()
    {
        return SalesOffer::with('vehicle')->get();
    }

    public function paginate($perPage = 15)
    {
        return SalesOffer::with('vehicle')->paginate($perPage);
    }

    public function find($id)
    {
        return SalesOffer::with('vehicle')->findOrFail($id);
    }

    public function create(array $data)
    {
        return SalesOffer::create($data);
    }

    public function update($id, array $data)
    {
        $model = SalesOffer::findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        $model = SalesOffer::findOrFail($id);
        return $model->delete();
    }
}
