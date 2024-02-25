<?php

namespace App\Services;

use App\Repositories\LearningCategoryRepository;

class LearningCategoryService
{
  public function __construct(LearningCategoryRepository $repository)
  {
    $this->repository = $repository;
  }


  public function findAll()
  {
    return $this->repository->findAll();
  }
}