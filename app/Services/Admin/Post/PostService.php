<?php

namespace App\Services\Admin\Post;

use App\Models\Post;

/**
 * Class PostService.
 */
class PostService
{
  public function store($data) {
    \App\Helpers\ImageHelper::save($data['thumbnail']);
    Post::create($data);
  }
}
