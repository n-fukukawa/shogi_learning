<?php

namespace App\Services;

use App\Repositories\LearningRepository;
use Illuminate\Support\Facades\Auth;

class LearningService
{
  public function __construct(LearningRepository $repository)
  {
    $this->repository = $repository;
  }

  public function findMyMonthlyLearnings($year, $month)
  {
    return $this->repository->findUserMonthlyLearnings(Auth::id(), $year, $month)
      ->orderBy('learning_at', 'desc')
      ->get();
  }


  public function getLearningStatics($learnings)
  {

  }


  public function save($params)
  {
    return $this->repository->save($params);
  }
}