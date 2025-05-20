<?php

namespace App\Modules\Servis\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Servis\Services\ServisService;
use App\Modules\Servis\Http\Requests\ServisRequest;
use App\Modules\Servis\Http\Resources\ServisResource;
use Illuminate\Http\JsonResponse;
use App\Traits\HandlesApiExceptions;

class ServisController extends Controller
{
    use HandlesApiExceptions;

    protected $servisService;

    public function __construct(ServisService $servisService)
    {
        $this->servisService = $servisService;
    }

    public function index(): JsonResponse
    {
        $data = $this->servisService->all();
        return $this->successResponse(ServisResource::collection($data));
    }

    public function store(ServisRequest $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $validatedData = $request->validated();
            $servis = $this->servisService->create($validatedData);
            return $this->createdResponse(new ServisResource($servis));
        });
    }

    public function show($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $data = $this->servisService->find($id);
            return $this->successResponse(new ServisResource($data));
        });
    }

    public function update(ServisRequest $request, $id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id, $request) {
            $validatedData = $request->validated();
            $servis = $this->servisService->update($id, $validatedData);
            return $this->updatedResponse(new ServisResource($servis));
        });
    }

    public function destroy($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $this->servisService->delete($id);
            return $this->deletedResponse();
        });
    }

    public function approve($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $servis = $this->servisService->approve($id);
            return $this->updatedResponse(new ServisResource($servis));
        });
    }

    public function reject($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $servis = $this->servisService->reject($id);
            return $this->updatedResponse(new ServisResource($servis));
        });
    }
}
