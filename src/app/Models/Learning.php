<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Learning extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "user_id",
        "category_id",
        "title",
        "comment",
        "learning_at",
        "learning_time",
    ];


    protected $casts = [
        'learning_at' => 'date'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(LearningCategory::class, 'category_id');
    }
}
