<?php

namespace App\Helpers;

use App\Enums\ModelType;

class ModelHelper
{
    // Verilen model tipine göre sınıf ismini döndürür
    public static function getModelClass(string $modelType): ?string
    {
        return ModelType::getClass($modelType);
    }

    // Model tiplerine ait enum'ları alır ve value yerine class döner
    public static function getModelTypes(): array
    {
        return ModelType::toArray();
    }
}
