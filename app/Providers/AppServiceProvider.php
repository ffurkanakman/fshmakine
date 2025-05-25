<?php
namespace App\Providers;
use App\Modules\Client\Providers\ClientServiceProvider;
use App\Modules\User\Providers\UserServiceProvider;
use App\Modules\Servis\Providers\ServisServiceProvider;
use App\Modules\Projects\Providers\ProjectsServiceProvider;
use Illuminate\Support\Facades\Schema;
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
        $this->app->register(ClientServiceProvider::class);
    // Register services
        $this->app->register(UserServiceProvider::class);
    // Register services
        $this->app->register(ServisServiceProvider::class);
    // Register services
        $this->app->register(ProjectsServiceProvider::class);
    // Register services
        //
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        Vite::prefetch(concurrency: 3);
    }
}
