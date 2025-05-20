<?php

namespace App\Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Auth\Services\AuthService;
use App\Modules\Auth\Http\Requests\AuthRequest;
use App\Modules\Auth\Http\Resources\AuthResource;
use Illuminate\Http\JsonResponse;
use App\Traits\HandlesApiExceptions;
use Illuminate\Http\Request;

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

    // ✅ Login metodu
    public function login(Request $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required']
            ]);

            $loginResult = $this->authService->login($credentials);

            return $this->successResponse($loginResult);
        });
    }

    public function register(Request $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $validated = $request->validate([
                'name'     => ['required', 'string', 'max:255'],
                'email'    => ['required', 'email', 'unique:users,email'],
                'password' => ['required', 'string', 'min:6'],
            ]);

            $user = \App\Models\User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => $validated['password'], // Laravel 11 cast ile otomatik hashleyecek
            ]);

            return $this->createdResponse([
                'token' => $user->createToken('auth_token')->plainTextToken,
                'user'  => $user,
            ], 'Kayıt başarılı');
        });
    }

}
