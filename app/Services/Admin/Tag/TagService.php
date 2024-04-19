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

  public function dataEdit($tag)
  {
    return [
      'tag' => $tag
    ];
  }

  public function update($tag, $data)
  {
    $tag->update($data);
  }

  public function destroy($tag)
  {
    $tag->delete();
  }
}
