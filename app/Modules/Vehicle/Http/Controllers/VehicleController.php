<?php

namespace App\Modules\Vehicle\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Vehicle\Services\VehicleService;
use App\Modules\Vehicle\Http\Requests\VehicleRequest;
use App\Modules\Vehicle\Http\Resources\VehicleResource;
use Illuminate\Http\JsonResponse;
use App\Traits\HandlesApiExceptions;

class VehicleController extends Controller
{
    use HandlesApiExceptions;

    protected $vehicleService;

    public function __construct(VehicleService $vehicleService)
    {
        $this->vehicleService = $vehicleService;
    }

    public function index(): JsonResponse
    {
        $data = $this->vehicleService->all();
        return $this->successResponse(VehicleResource::collection($data));
    }

    public function store(VehicleRequest $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $validatedData = $request->validated();
            $coverImage = $request->file('cover_image');
            $images = $request->file('images') ?? null;

            $vehicle = $this->vehicleService->create($validatedData, $coverImage, $images)->load('gallery', 'specifications');

            return $this->createdResponse(new VehicleResource($vehicle));
        });
    }


    public function show($id): JsonResponse
    {
        $data = $this->vehicleService->find($id);
        return $this->successResponse(new VehicleResource($data));
    }

    public function update(VehicleRequest $request, $id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id, $request) {
            $validatedData = $request->validated();
            $coverImage = $request->file('cover_image');
            $images = $request->file('images') ?? null;

            $vehicle = $this->vehicleService->update($id, $validatedData, $coverImage, $images)->load('gallery', 'specifications');

            return $this->updatedResponse(new VehicleResource($vehicle));
        });
    }


    public function destroy($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $this->vehicleService->delete($id);
            return $this->deletedResponse();
        });
    }

    public function deleteImage($vehicleId, $imageId): \Illuminate\Http\JsonResponse
    {
        $image = \App\Modules\Vehicle\Models\VehicleImage::where('vehicle_id', $vehicleId)
            ->where('id', $imageId)
            ->firstOrFail();

        $image->delete();

        return response()->json([
            'status' => true,
            'message' => 'Resim başarıyla silindi.'
        ]);
    }



}
