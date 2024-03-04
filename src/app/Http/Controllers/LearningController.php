<?php

namespace App\Http\Controllers;

use App\Http\Requests\Learning\DeleteLearningRequest;
use App\Http\Requests\Learning\EditLearningRequest;
use App\Http\Requests\Learning\StoreLearningRequest;
use App\Services\LearningService;

class LearningController extends Controller
{
    public function __construct(
        private LearningService $learningService
    )
    {
        $this->learningService = $learningService;
    }

    public function store(StoreLearningRequest $request)
    {
        $this->learningService->save($request->all());
    }

    public function edit(EditLearningRequest $request, int $id)
    {
        $this->learningService->update($id, $request->validated());
    }

    public function delete(DeleteLearningRequest $request, int $id)
    {
        $this->learningService->delete($id, $request->validated());
    }
}
