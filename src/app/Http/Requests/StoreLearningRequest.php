<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLearningRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user_id === $this->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "user_id" => "required|integer|exists:users,id",
            "category_id" => "required|integer|exists:learning_categories,id",
            "learning_at" => "required|date",
            "learning_time" => "required|integer|min:1|max:1440",
            "title" => "nullable|string|max:100",
            "comment" => "nullable|string|max:500",
        ];
    }
}
