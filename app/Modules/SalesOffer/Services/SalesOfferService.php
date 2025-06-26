<?php

namespace App\Modules\SalesOffer\Services;

use App\Modules\SalesOffer\Repositories\SalesOfferRepository;

class SalesOfferService
{
    protected SalesOfferRepository $salesOfferRepository;

    public function __construct(SalesOfferRepository $salesOfferRepository)
    {
        $this->salesOfferRepository = $salesOfferRepository;
    }

    public function all()
    {
        return $this->salesOfferRepository->all();
    }

    public function find(int $id)
    {
        return $this->salesOfferRepository->find($id);
    }

    public function create(array $data)
    {
        $salesOffer = $this->salesOfferRepository->create($data);
        return $salesOffer->load('vehicle.brand', 'vehicle.gallery', 'vehicle.specifications');
    }


    public function update(int $id, array $data)
    {
        return $this->salesOfferRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->salesOfferRepository->delete($id);
    }
}
