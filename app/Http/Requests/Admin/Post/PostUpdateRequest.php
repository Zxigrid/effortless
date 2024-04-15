<?php

namespace App\Http\Requests\Admin\Post;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'title' => ['required', 'string', 'max:255', 'min:5', 'unique:posts,title,'.$this->post->id],
      'slug' => ['required', 'string', 'max:255', 'min:5', 'unique:posts,slug,'.$this->post->id],
      'body' => ['required', 'string', 'min:5', 'max:255'],
      'thumbnail' => ['image', 'nullable'],
    ];
  }

  public function data()
  {
    return [
      'title' => $this->title,
      'slug' => $this->slug,
      'body' => $this->body,
      'thumbnail' => $this->file('thumbnail'),
      'user_id' => $this->user()->id,
      'status' => $this->status,
    ];
  }
}
