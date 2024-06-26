<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
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
            'name' => ['required', 'min:3', 'max:255', 'string', 'unique:categories,name,'.$this->category->id],
            'slug' => ['required', 'min:3', 'max:255', 'string', 'unique:categories,slug,'.$this->category->id],
        ];
    }

    public function data(): array
    {
      return [
        'name' => $this->name,
        'slug'=> $this->slug
      ];
    }
}
