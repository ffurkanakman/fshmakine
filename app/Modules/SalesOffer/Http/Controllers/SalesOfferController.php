<?php

namespace App\Modules\SalesOffer\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SalesOffer\Services\SalesOfferService;
use App\Modules\SalesOffer\Http\Requests\SalesOfferRequest;
use App\Modules\SalesOffer\Http\Resources\SalesOfferResource;
use Illuminate\Http\JsonResponse;
use App\Traits\HandlesApiExceptions;

class SalesOfferController extends Controller
{
    use HandlesApiExceptions;

    protected SalesOfferService $salesOfferService;

    public function __construct(SalesOfferService $salesOfferService)
    {
        $this->salesOfferService = $salesOfferService;
    }

    public function index(): JsonResponse
    {
        $data = $this->salesOfferService->all();
        return $this->successResponse(SalesOfferResource::collection($data));
    }

    public function store(SalesOfferRequest $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $validatedData = $request->validated();
            $salesOffer = $this->salesOfferService->create($validatedData);
            return $this->createdResponse(new SalesOfferResource($salesOffer));
        });
    }

    public function show(int $id): JsonResponse
    {
        $data = $this->salesOfferService->find($id);
        return $this->successResponse(new SalesOfferResource($data));
    }

    public function update(SalesOfferRequest $request, int $id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request, $id) {
            $validatedData = $request->validated();
            $salesOffer = $this->salesOfferService->update($id, $validatedData);
            return $this->updatedResponse(new SalesOfferResource($salesOffer));
        });
    }

    public function destroy(int $id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $this->salesOfferService->delete($id);
            return $this->deletedResponse();
        });
    }
}
