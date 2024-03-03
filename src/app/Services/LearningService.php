<?php

namespace App\Services;

use App\Repositories\LearningRepository;
use Illuminate\Support\Facades\Auth;

class LearningService
{
  public function __construct(
    private LearningRepository $repository
  )
  {
    $this->repository = $repository;
  }

  public function findMyMonthlyLearnings($year, $month)
  {
    return $this->repository->findUserMonthlyLearnings(Auth::id(), $year, $month)
      ->orderBy('learning_at', 'desc')
      ->orderBy('created_at', 'desc')
      ->get();
  }


  public function getLearningStatics($learnings)
  {
    $categories = $learnings->groupBy('category_id');

    return $categories->map(function ($learnings) {
      return [
        "category" => $learnings->first()->category,
        "learning_time" => $learnings->sum("learning_time"),
      ];
    })->values();
  }


  public function save($params)
  {
    return $this->repository->save($params);
  }


  public function update($id, $params)
  {
    return $this->repository->update($id, $params);
  }
}