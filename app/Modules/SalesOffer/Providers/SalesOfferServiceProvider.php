<?php

namespace App\Modules\SalesOffer\Providers;

use Illuminate\Support\ServiceProvider;

class SalesOfferServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind your services here
    }

    public function boot()
    {
        // Config dosyasını yükle
        $this->mergeConfigFrom(
            app_path("Modules/SalesOffer/config.php"), "SalesOfferModule"
        );

        // Eğer active config değeri false ise, rotaları yüklemiyoruz
        if (config("SalesOfferModule.active") === true) {
            // Rotaları yükle
            $this->loadMigrationsFrom(app_path("Modules/SalesOffer/database/migrations"));

            if (file_exists($routesPath = app_path("Modules/SalesOffer/routes/api.php"))) {
                $this->loadRoutesFrom($routesPath);
            }
        }
    }
}