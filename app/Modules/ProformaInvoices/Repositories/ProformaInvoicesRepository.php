<?php

namespace App\Modules\ProformaInvoices\Repositories;

use App\Modules\ProformaInvoices\Models\ProformaInvoices;
use App\Modules\Projects\Models\ProjectPart;

class ProformaInvoicesRepository
{
    public function all()
    {
        return ProformaInvoices::all();
    }

    public function paginate($perPage = 15)
    {
        return ProformaInvoices::paginate($perPage);
    }

    public function find($id)
    {
        return ProformaInvoices::with(['parts.part'])->findOrFail($id);
    }


    public function create(array $data)
    {
        $partIds = $data['part_ids'] ?? [];
        unset($data['part_ids']);

        // Parçaları çek
        $parts = ProjectPart::whereIn('id', $partIds)->get();

        // Fatura toplamını hesapla
        $data['total_price'] = $parts->sum('total_price');

        // Fatura oluştur
        $invoice = ProformaInvoices::create($data);

        // Parçaları ilişkilendir
        foreach ($partIds as $partId) {
            $invoice->parts()->create([
                'part_id' => $partId,
            ]);
        }

        return $invoice->load('parts.part');
    }



    public function update($id, array $data)
    {
        $model = ProformaInvoices::findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        $model = ProformaInvoices::findOrFail($id);
        return $model->delete();
    }
}
