<?php

namespace App\Services\Admin\Post;

use App\Models\Post;

/**
 * Class PostService.
 */
class PostService
{

  public function dataIndex()
  {
    return [
      'posts' => Post::paginate(10),
    ];
  }

  public function store($data)
  {
    $fileName = \App\Helpers\ImageHelper::save($data['thumbnail']);
    $data['thumbnail'] = $fileName;
    Post::create($data);
  }

  public function dataEdit(Post $post)
  {
    return [
      'postData' => $post
    ];
  }

  public function update(Post $post, $data)
  {
    if (isset($data['thumbnail'])) {
      $fileName = \App\Helpers\ImageHelper::save($data['thumbnail']);
      $data['thumbnail'] = $fileName;
    } else {
      $data['thumbnail'] = $post->thumbnail;
    }
    $post->update($data);
  }
}
