<?php

namespace App\Providers;
use App\Modules\Servis\Providers\ServisServiceProvider;
use App\Modules\Auth\Providers\AuthServiceProvider;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    // Register services
        $this->app->register(ServisServiceProvider::class);
    // Register services
        $this->app->register(AuthServiceProvider::class);
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
