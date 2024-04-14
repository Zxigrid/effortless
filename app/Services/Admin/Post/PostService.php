<?php

namespace App\Services\Admin\Post;

use App\Models\Post;

/**
 * Class PostService.
 */
class PostService
{

  public function dataIndex() {
    return [
      'posts'=>Post::paginate(10),
    ];
  }

  public function store($data) {
    $fileName = \App\Helpers\ImageHelper::save($data['thumbnail']);
    $data['thumbnail'] = $fileName;
    Post::create($data);
  }
}
