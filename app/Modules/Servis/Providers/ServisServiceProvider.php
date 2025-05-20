<?php

namespace App\Modules\Servis\Providers;

use Illuminate\Support\ServiceProvider;

class ServisServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind your services here
    }

    public function boot()
    {
        // Config dosyasını yükle
        $this->mergeConfigFrom(
            app_path("Modules/Servis/config.php"), "ServisModule"
        );

        // Eğer active config değeri false ise, rotaları yüklemiyoruz
        if (config("ServisModule.active") === true) {
            // Rotaları yükle
            $this->loadMigrationsFrom(app_path("Modules/Servis/database/migrations"));

            if (file_exists($routesPath = app_path("Modules/Servis/routes/api.php"))) {
                $this->loadRoutesFrom($routesPath);
            }
        }
    }
}