<?php

namespace App\Services\Admin\Tag;

use App\Models\Tag;

/**
 * Class TagService.
 */
class TagService
{
  public function dataIndex($search)
  {
    $tags = Tag::query()->search($search)->paginate(10);
    return [
      'tags' => $tags
    ];
  }

  public function store($data)
  {
    return Tag::create($data);
  }
}
