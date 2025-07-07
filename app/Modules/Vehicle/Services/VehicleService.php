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

    public function create(array $data, $coverImage = null, $images = null)
    {
        if ($coverImage) {
            $data['cover_image'] = $coverImage;
        }

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

    public function update($id, array $data, $coverImage = null, $images = null)
    {
        $vehicle = $this->vehicleRepository->update($id, $data);

        if ($coverImage) {
            $this->vehicleRepository->updateCoverImage($vehicle, $coverImage);
        }

        if ($images) {
            $this->vehicleRepository->updateImages($vehicle, $images);
        }

        return $vehicle;
    }


    public function delete($id)
    {
        return $this->vehicleRepository->delete($id);
    }
}
