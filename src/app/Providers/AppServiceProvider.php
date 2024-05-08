<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('App\Services\LearningCategoryService');
        $this->app->bind('App\Repositories\LearningCategoryRepository');
        
        $this->app->bind('App\Services\LearningService');
        $this->app->bind('App\Repositories\LearningRepository');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (request()->isSecure()) {
            URL::forceScheme('https');
        }
    }
}
