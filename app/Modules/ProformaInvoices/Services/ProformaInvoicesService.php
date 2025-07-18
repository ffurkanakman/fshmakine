<?php

namespace App\Modules\ProformaInvoices\Services;

use App\Modules\ProformaInvoices\Repositories\ProformaInvoicesRepository;

class ProformaInvoicesService
{
    protected $proformaInvoicesRepository;

    public function __construct(ProformaInvoicesRepository $proformaInvoicesRepository)
    {
        $this->proformaInvoicesRepository = $proformaInvoicesRepository;
    }

    public function all()
    {
        return $this->proformaInvoicesRepository->all();
    }

    public function create(array $data)
    {
        return $this->proformaInvoicesRepository->create($data);
    }

    public function find($id)
    {
        return $this->proformaInvoicesRepository->find($id);
    }

    public function update($id, array $data)
    {
        return $this->proformaInvoicesRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->proformaInvoicesRepository->delete($id);
    }
}