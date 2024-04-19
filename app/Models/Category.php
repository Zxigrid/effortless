<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug'
    ];

    public function scopeSearch(Builder $query, string $search = null): Builder
    {
      return $this->when($search, function (Builder $query, $search) {
        $query->where('name', 'like', "%$search%")
              ->orWhere('slug', 'like', "%$search%");
      });
    }
}
