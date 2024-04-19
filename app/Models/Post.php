<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
      'title',
      'slug',
      'thumbnail',
      'body',
      'status',
      'user_id'
    ];

    public function scopeSearch(Builder $query, string $search = null): Builder
    {
      return $this->when($search, function (Builder $query, $search) {
        $query->where('title', 'like', "%$search%")
              ->orWhere('body', 'like', "%$search%")
              ->orWhere('slug', 'like', "%$search%");
      });
    }
}
