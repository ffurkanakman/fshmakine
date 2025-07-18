<?php

namespace App\Modules\ProformaInvoices\Providers;

use Illuminate\Support\ServiceProvider;

class ProformaInvoicesServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind your services here
    }

    public function boot()
    {
        // Config dosyasını yükle
        $this->mergeConfigFrom(
            app_path("Modules/ProformaInvoices/config.php"), "ProformaInvoicesModule"
        );

        // Eğer active config değeri false ise, rotaları yüklemiyoruz
        if (config("ProformaInvoicesModule.active") === true) {
            // Rotaları yükle
            $this->loadMigrationsFrom(app_path("Modules/ProformaInvoices/database/migrations"));

            if (file_exists($routesPath = app_path("Modules/ProformaInvoices/routes/api.php"))) {
                $this->loadRoutesFrom($routesPath);
            }
        }
    }
}