<?php

namespace App\Modules\Vehicle\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Modules\Vehicle\Models\VehicleBrand;
use App\Traits\HandlesApiExceptions;

class VehicleBrandController extends Controller
{
    use HandlesApiExceptions;

    public function store(Request $request): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($request) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'logo' => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048',
            ]);

            $data = ['name' => $validated['name']];

            if ($request->hasFile('logo')) {
                $data['logo_path'] = $request->file('logo')->store('brands', 'public');
            }

            $brand = VehicleBrand::create($data);

            return $this->createdResponse($brand);
        });
    }

    public function index(): JsonResponse
    {
        $brands = VehicleBrand::all();
        return $this->successResponse($brands);
    }

    public function destroy($id): JsonResponse
    {
        return $this->handleApiExceptions(function () use ($id) {
            $brand = VehicleBrand::findOrFail($id);

            // Eğer markaya bağlı araçlar varsa burayı düzenleyebilirsin
            // Örneğin:
            // $brand->vehicles()->update(['vehicle_brand_id' => null]);

            $brand->delete(); // soft delete
            return response()->json(['message' => 'Marka başarıyla silindi.']);
        });
    }

}
