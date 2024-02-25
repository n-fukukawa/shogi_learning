<?php

namespace App\Http\Controllers;

use App\Services\LearningCategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(LearningCategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    
    public function index(Request $request)
    {
        $categories = $this->categoryService->findAll();
        return Inertia::render('Dashboard/Dashboard', ["categories" => $categories]);
    }
}
