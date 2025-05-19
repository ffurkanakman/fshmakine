<?php

namespace App\Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Auth\Services\AuthService;
use App\Modules\Auth\Http\Requests\AuthRequest;
use App\Modules\Auth\Http\Resources\AuthResource;
use Illuminate\Http\JsonResponse;
use App\Traits\HandlesApiExceptions;

class AuthController extends Controller
{
    use HandlesApiExceptions;

    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index(): JsonResponse
    {
        $data = $this->authService->all();
        return $this->successResponse(AuthResource::collection($data));
    }


    public function store(AuthRequest $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $validatedData = $request->validated();
            $auth = $this->authService->create($validatedData);
            return $this->createdResponse($auth);
        });
    }

    public function show($id): JsonResponse
    {
        $data = $this->authService->find($id);
        return $this->successResponse(new AuthResource($data));
    }

    public function update(AuthRequest $request, $id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id, $request) {
            $validatedData = $request->validated();
            $auth = $this->authService->update($id, $validatedData);
            return $this->updatedResponse($auth);
        });
    }

    public function destroy($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $this->authService->delete($id);
        return $this->deletedResponse();
        });
    }
}