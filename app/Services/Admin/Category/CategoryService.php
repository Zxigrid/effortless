<?php

namespace App\Services\Admin\Category;

use App\Models\Category;

/**
 * Class CategoryService.
 */
class CategoryService
{
  public function dataIndex($search)
  {
    $categories = Category::query()->search($search)->paginate(10);
    return [
      'categories' => $categories
    ];
  }

  public function store($data)
  {
    Category::create($data);
  }

  public function dataEdit($category)
  {
    return [
      'category' => $category
    ];
  }

  public function update($category, $data)
  {
    $category->update($data);
  }

  public function destroy($category)
  {
    $category->delete();
  }
}
