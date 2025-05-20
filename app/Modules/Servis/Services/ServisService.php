<?php

namespace App\Modules\Servis\Services;

use App\Modules\Servis\Repositories\ServisRepository;
use Illuminate\Support\Str;

class ServisService
{
    protected ServisRepository $servisRepository;

    public function __construct(ServisRepository $servisRepository)
    {
        $this->servisRepository = $servisRepository;
    }

    public function all()
    {
        return $this->servisRepository->all();
    }

    public function paginate($perPage = 15)
    {
        return $this->servisRepository->paginate($perPage);
    }

    public function find($id)
    {
        return $this->servisRepository->find($id);
    }

    public function create(array $data)
    {
        // Kod üretimi (örnek: FSH-3125)
        $data['code'] = $this->generateCode();
        return $this->servisRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->servisRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->servisRepository->delete($id);
    }

    public function approve($id)
    {
        return $this->servisRepository->updateStatus($id, 'onaylandi');
    }

    public function reject($id)
    {
        return $this->servisRepository->updateStatus($id, 'reddedildi');
    }

    private function generateCode(): string
    {
        $prefix = 'FSH-';
        $random = rand(3000, 9999);
        return $prefix . $random;
    }
}
