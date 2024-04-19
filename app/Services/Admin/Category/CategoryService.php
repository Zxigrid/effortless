<?php

namespace App\Services\Admin\Category;

use App\Models\Category;

/**
 * Class CategoryService.
 */
class CategoryService
{
  public function store($data)
  {
    Category::create($data);
  }
}
