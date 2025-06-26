<?php

namespace App\Modules\Vehicle\Services;

use App\Modules\Vehicle\Repositories\VehicleRepository;

class VehicleService
{
    protected $vehicleRepository;

    public function __construct(VehicleRepository $vehicleRepository)
    {
        $this->vehicleRepository = $vehicleRepository;
    }

    public function all()
    {
        return $this->vehicleRepository->all();
    }

    public function create(array $data, $images = null)
    {
        $vehicle = $this->vehicleRepository->create($data);

        if ($images) {
            $this->vehicleRepository->addImages($vehicle, $images);
        }

        if (isset($data['specifications']) && is_array($data['specifications'])) {
            $this->vehicleRepository->addSpecifications($vehicle, $data['specifications']);
        }

        return $vehicle;
    }

    public function find($id)
    {
        return $this->vehicleRepository->find($id);
    }

    public function update($id, array $data)
    {
        return $this->vehicleRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->vehicleRepository->delete($id);
    }
}
