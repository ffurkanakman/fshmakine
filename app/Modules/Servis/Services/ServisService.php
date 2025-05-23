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

    public function update($id, array $data)
    {
        // 1️⃣ Servisi bul
        $servis = $this->servisRepository->find($id);

        // 2️⃣ Eğer client bilgisi varsa ve gönderilen veriler client’a aitse → güncelle
        if ($servis->client && collect($data)->hasAny(['authorized_person', 'company_name', 'phone', 'address'])) {
            $clientUpdateData = collect($data)->only(['authorized_person', 'company_name', 'phone', 'address'])->toArray();
            $servis->client->update($clientUpdateData);
        }

        // 3️⃣ Servis tablosuna ait olmayan alanları ayıkla
        $servisData = collect($data)->except(['authorized_person', 'company_name', 'phone', 'address'])->toArray();

        // 4️⃣ Servis verisini güncelle
        return $this->servisRepository->update($id, $servisData);
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
