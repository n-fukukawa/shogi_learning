<?php

namespace App\Repositories;

use App\Models\LearningCategory;

class LearningCategoryRepository
{
  public function findAll()
  {
    $learnings = LearningCategory::all();

    return $learnings;
  }
}