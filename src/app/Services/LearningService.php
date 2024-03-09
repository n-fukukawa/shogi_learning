<?php

namespace App\Services;

use App\Repositories\LearningRepository;
use Carbon\Carbon;
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

  /**
   * 直近1年間の月ごとの学習統計を取得（2023/3～2024/3）
   */
  public function getMyRecentlyLearningStatistics($year, $month)
  {
    $learnings = $this->repository->findUserYearlyLearnings(Auth::id(), $year, $month)
      ->orderBy('learning_at', 'desc')
      ->orderBy('created_at', 'desc')
      ->get();
      
    $learnings = $learnings->groupBy(function ($learning) {
        return $learning->learning_at->format('Y/n');
      })->map(function ($learnings) {
        return $this->getLearningStatics($learnings);
      });

    $result = [];

    $current = Carbon::parse("$year-$month-01")->startOfMonth();
    $from = $current->copy()->subYearWithoutOverflow();
    $to = $current->copy()->endOfMonth();

    for ($d = $from->copy(); $d <= $to; $d->addMonthNoOverflow()) {
      $ym = $d->format('Y/n');
      $result[$ym] = $learnings[$ym] ?? [];
    }

    return $result;
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


  public function delete($id)
  {
    return $this->repository->delete($id);
  }
}