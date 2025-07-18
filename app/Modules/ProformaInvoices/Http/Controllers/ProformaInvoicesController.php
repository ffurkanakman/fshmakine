<?php

namespace App\Modules\ProformaInvoices\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ProformaInvoices\Services\ProformaInvoicesService;
use App\Modules\ProformaInvoices\Http\Requests\ProformaInvoicesRequest;
use App\Modules\ProformaInvoices\Http\Resources\ProformaInvoicesResource;
use Illuminate\Http\JsonResponse;
use App\Traits\HandlesApiExceptions;

class ProformaInvoicesController extends Controller
{
    use HandlesApiExceptions;

    protected $proformaInvoicesService;

    public function __construct(ProformaInvoicesService $proformaInvoicesService)
    {
        $this->proformaInvoicesService = $proformaInvoicesService;
    }

    public function index(): JsonResponse
    {
        $data = $this->proformaInvoicesService->all();
        return $this->successResponse(ProformaInvoicesResource::collection($data));
    }


    public function store(ProformaInvoicesRequest $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $validatedData = $request->validated();
            $proformaInvoices = $this->proformaInvoicesService->create($validatedData);
            return $this->createdResponse($proformaInvoices);
        });
    }

    public function show($id): JsonResponse
    {
        $data = $this->proformaInvoicesService->find($id);
        return $this->successResponse(new ProformaInvoicesResource($data));
    }

    public function update(ProformaInvoicesRequest $request, $id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id, $request) {
            $validatedData = $request->validated();
            $proformaInvoices = $this->proformaInvoicesService->update($id, $validatedData);
            return $this->updatedResponse($proformaInvoices);
        });
    }

    public function destroy($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $this->proformaInvoicesService->delete($id);
        return $this->deletedResponse();
        });
    }
}