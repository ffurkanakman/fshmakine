<?php

namespace App\Traits;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;

trait HandlesApiExceptions
{
    /**
     * API İstisnalarını Yönetir
     *
     * @param \Closure $callback
     * @return \Illuminate\Http\JsonResponse
     */
    protected function handleApiExceptions(\Closure $callback)
    {
        try {
            return $callback();
        } catch (AuthorizationException $e) {
            return $this->errorResponse('Yetkilendirme başarısız', 403, ['error' => $e->getMessage()]);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('İstenen id bulunamadı', 404, ['error' => $e->getMessage()]);
        } catch (HttpException $e) {
            return $this->errorResponse($e->getMessage(), $e->getStatusCode(), ['error' => $e->getMessage()]);
        } catch (\Exception $e) {
            return $this->errorResponse('Beklenmedik bir hata oluştu', 500, ['error' => $e->getMessage()]);
        }
    }

    /**
     * Başarısız response üretir
     */
    protected function errorResponse(string $message = 'Bir hata oluştu', int $status = 500, array $extra = []): \Illuminate\Http\JsonResponse
    {
        return response()->json(array_merge([
            'status' => false,
            'message' => $message,
        ], $extra), $status);
    }

    /**
     * Başarılı response üretir
     */
    protected function successResponse(mixed $data = null, string $message = 'İşlem başarılı'): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ]);
    }

    /**
     * Oluşturma işlemi için response
     */
    protected function createdResponse(mixed $data = null, string $message = 'Kayıt başarıyla oluşturuldu'): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], 201);
    }

    /**
     * Güncelleme işlemi için response
     */
    protected function updatedResponse(mixed $data = null, string $message = 'Güncelleme başarılı'): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ]);
    }

    /**
     * Silme işlemi için response
     */
    protected function deletedResponse(string $message = 'Silme işlemi başarılı'): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
        ]);
    }
}
