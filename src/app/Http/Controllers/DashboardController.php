<?php

namespace App\Http\Controllers;

use App\Http\Requests\DashboardRequest;
use App\Services\LearningCategoryService;
use App\Services\LearningService;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private LearningService $learningService,
        private LearningCategoryService $categoryService,
    )
    {
        $this->learningService = $learningService;
        $this->categoryService = $categoryService;
    }

    
    public function index(DashboardRequest $request)
    {
        $today = Carbon::today();
        $year = $request->year ? intval($request->year) : $today->year;
        $month = $request->month ? intval($request->month) : $today->month;

        $learnings = $this->learningService->findMyMonthlyLearnings($year, $month);
        $statistics = $this->learningService->getLearningStatics($learnings);
        $statisticsSet = $this->learningService->getMyRecentlyLearningStatistics($year, $month);
        $categories = $this->categoryService->findAll();

        return Inertia::render(
            'Dashboard/Dashboard', 
            compact("year", "month", "learnings", "statistics", "statisticsSet", "categories")
        );
    }
}
