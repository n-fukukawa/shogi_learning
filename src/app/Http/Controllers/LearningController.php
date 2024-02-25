<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLearningRequest;
use App\Services\LearningService;
use Illuminate\Support\Facades\Redirect;

class LearningController extends Controller
{
    public function __construct(LearningService $learningService)
    {
        $this->learningService = $learningService;
    }

    public function store(StoreLearningRequest $request)
    {
        $this->learningService->save($request->all());

        return Redirect::route('dashboard');
    }
}
