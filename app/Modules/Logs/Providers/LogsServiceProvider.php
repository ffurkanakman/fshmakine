<?php

namespace App\Modules\Logs\Providers;

use Illuminate\Support\ServiceProvider;

class LogsServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind your services here
    }

    public function boot()
    {
        // Config dosyasını yükle
        $this->mergeConfigFrom(
            app_path("Modules/Logs/config.php"), "LogsModule"
        );

        // Eğer active config değeri false ise, rotaları yüklemiyoruz
        if (config("LogsModule.active") === true) {
            // Rotaları yükle
            $this->loadMigrationsFrom(app_path("Modules/Logs/database/migrations"));

            if (file_exists($routesPath = app_path("Modules/Logs/routes/api.php"))) {
                $this->loadRoutesFrom($routesPath);
            }
        }
    }
}