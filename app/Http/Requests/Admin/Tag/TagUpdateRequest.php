<?php

namespace App\Http\Requests\Admin\Tag;

use Illuminate\Foundation\Http\FormRequest;

class TagUpdateRequest extends FormRequest
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
      'name' => ['required', 'string', 'max:255', 'min:3', 'unique:tags,name,'.$this->tag->id],
      'slug' => ['required', 'string', 'max:255', 'min:3', 'unique:tags,slug,'.$this->tag->id],
    ];
  }

  public function data(): array
  {
    return [
      'name' => $this->name,
      'slug' => $this->slug,
    ];
  }
}
