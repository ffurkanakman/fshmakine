<?php

namespace App\Modules\Vehicle\Providers;

use Illuminate\Support\ServiceProvider;

class VehicleServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind your services here
    }

    public function boot()
    {
        // Config dosyasını yükle
        $this->mergeConfigFrom(
            app_path("Modules/Vehicle/config.php"), "VehicleModule"
        );

        // Eğer active config değeri false ise, rotaları yüklemiyoruz
        if (config("VehicleModule.active") === true) {
            // Rotaları yükle
            $this->loadMigrationsFrom(app_path("Modules/Vehicle/database/migrations"));

            if (file_exists($routesPath = app_path("Modules/Vehicle/routes/api.php"))) {
                $this->loadRoutesFrom($routesPath);
            }
        }
    }
}