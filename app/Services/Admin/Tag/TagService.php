<?php

namespace App\Services\Admin\Tag;

use App\Models\Tag;

/**
 * Class TagService.
 */
class TagService
{
  public function store($data)
  {
    return Tag::create($data);
  }
}
