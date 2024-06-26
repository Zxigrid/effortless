<?php

namespace App\Services\Admin\Post;

use App\Models\Post;

/**
 * Class PostService.
 */
class PostService
{

  public function dataIndex($search)
  {
    $posts = Post::query()->search($search)->paginate(10);
    return [
      'posts' => $posts
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

  public function updateStatus($post, $status)
  {
    $post->update(['status' => $status]);
  }

  public function destroy(Post $post)
  {
    if(file_exists(substr($post->file, 1))){
      unlink(substr($post->file,1));
    }
    $post->delete();
  }
}
