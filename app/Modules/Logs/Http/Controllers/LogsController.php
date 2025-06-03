<?php

namespace App\Modules\Logs\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Logs\Services\LogsService;
use App\Modules\Logs\Http\Requests\LogsRequest;
use App\Modules\Logs\Http\Resources\LogsResource;
use Illuminate\Http\JsonResponse;
use App\Traits\HandlesApiExceptions;

class LogsController extends Controller
{
    use HandlesApiExceptions;

    protected $logsService;

    public function __construct(LogsService $logsService)
    {
        $this->logsService = $logsService;
    }

    public function index(): JsonResponse
    {
        $data = $this->logsService->all();
        return $this->successResponse(LogsResource::collection($data));
    }


    public function store(LogsRequest $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $validatedData = $request->validated();
            $logs = $this->logsService->create($validatedData);
            return $this->createdResponse($logs);
        });
    }

    public function show($id): JsonResponse
    {
        $data = $this->logsService->find($id);
        return $this->successResponse(new LogsResource($data));
    }

    public function update(LogsRequest $request, $id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id, $request) {
            $validatedData = $request->validated();
            $logs = $this->logsService->update($id, $validatedData);
            return $this->updatedResponse($logs);
        });
    }

    public function destroy($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $this->logsService->delete($id);
        return $this->deletedResponse();
        });
    }
}