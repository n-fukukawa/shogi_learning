<?php

namespace App\Repositories;

use App\Models\Learning;
use Carbon\Carbon;

class LearningRepository
{
  public function findUserMonthlyLearnings($user_id, $year, $month)
  {
    $from = Carbon::parse("$year-$month-01")->startOfMonth();
    $to = $from->copy()->endOfMonth();

    $learnings = Learning::with(['category'])->where('user_id', $user_id)
      ->whereBetween('learning_at', [$from, $to])
      ->orderBy('learning_at', 'desc');

    return $learnings;
  }


  public function save($params)
  {
    $learning = Learning::create($params);

    return $learning;
  }
}