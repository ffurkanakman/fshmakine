<?php

namespace App\Modules\Auth\Services;

use App\Modules\Auth\Repositories\AuthRepository;

class AuthService
{
    protected $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function all()
    {
        return $this->authRepository->all();
    }

    public function create(array $data)
    {
        return $this->authRepository->create($data);
    }

    public function find($id)
    {
        return $this->authRepository->find($id);
    }

    public function update($id, array $data)
    {
        return $this->authRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->authRepository->delete($id);
    }

    public function login(array $credentials): array
    {
        $user = \App\Models\User::where('email', $credentials['email'])->first();

        if (! $user || ! \Hash::check($credentials['password'], $user->password)) {
            abort(401, 'Bilgiler hatalı');
        }

        return [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user'  => $user
        ];
    }

}
