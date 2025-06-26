<?php

namespace App\Modules\Vehicle\Repositories;

use App\Modules\Vehicle\Models\Vehicle;

class VehicleRepository
{
    public function all()
    {
        return Vehicle::all();
    }

    public function paginate($perPage = 15)
    {
        return Vehicle::paginate($perPage);
    }

    public function find($id)
    {
        return Vehicle::findOrFail($id);
    }

    public function create(array $data)
    {
        return Vehicle::create($data);
    }

    public function update($id, array $data)
    {
        $model = Vehicle::findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        $model = Vehicle::findOrFail($id);
        return $model->delete();
    }

    public function addImages($vehicle, $images)
    {
        foreach ($images as $image) {
            $path = $image->store('vehicles', 'public');
            $vehicle->gallery()->create(['image_path' => $path]);
        }
    }

    public function addSpecifications($vehicle, array $specs)
    {
        foreach ($specs as $spec) {
            $vehicle->specifications()->create([
                'key' => $spec['key'],
                'value' => $spec['value'],
            ]);
        }
    }
}
