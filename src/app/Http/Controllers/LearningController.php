<?php

namespace App\Http\Controllers;

use App\Http\Requests\Learning\DeleteLearningRequest;
use App\Http\Requests\Learning\EditLearningRequest;
use App\Http\Requests\Learning\StoreLearningRequest;
use App\Services\LearningService;
use Throwable;

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
        try {
            $this->learningService->save($request->validated());
            $this->onSuccess();

        } catch (Throwable $e) {
            $this->onError($e);
        }
    }


    public function edit(EditLearningRequest $request, int $id)
    {
        try {
            $this->learningService->update($id, $request->validated());
            $this->onSuccess();

        } catch (Throwable $e) {
            $this->onError($e);
        }
    }


    public function delete(DeleteLearningRequest $request, int $id)
    {
        try {
            $this->learningService->delete($id, $request->validated());
            $this->onSuccess('削除しました');

        } catch (Throwable $e) {
            $this->onError($e, '削除できませんでした');
        }
    }
}
