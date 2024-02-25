<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Learning extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "category_id",
        "title",
        "comment",
        "learning_at",
        "learning_time",
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(LearningCategory::class, 'category_id');
    }
}
