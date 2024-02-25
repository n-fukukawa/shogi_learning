<?php

namespace App\Services;

use App\Repositories\LearningRepository;

class LearningService
{
  public function __construct(LearningRepository $repository)
  {
    $this->repository = $repository;
  }


  public function save($params)
  {
    return $this->repository->save($params);
  }
}