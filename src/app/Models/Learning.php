<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
