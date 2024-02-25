<?php

namespace App\Repositories;

use App\Models\Learning;

class LearningRepository
{
  public function save($params)
  {
    $learning = Learning::create($params);

    return $learning;
  }
}