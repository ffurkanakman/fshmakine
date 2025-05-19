<?php

namespace App\Modules\Auth\Providers;

use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind your services here
    }

    public function boot()
    {
        // Config dosyasını yükle
        $this->mergeConfigFrom(
            app_path("Modules/Auth/config.php"), "AuthModule"
        );

        // Eğer active config değeri false ise, rotaları yüklemiyoruz
        if (config("AuthModule.active") === true) {
            // Rotaları yükle
            $this->loadMigrationsFrom(app_path("Modules/Auth/database/migrations"));

            if (file_exists($routesPath = app_path("Modules/Auth/routes/api.php"))) {
                $this->loadRoutesFrom($routesPath);
            }
        }
    }
}