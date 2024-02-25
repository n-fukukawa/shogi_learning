<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningBattleStyle extends Model
{
    use HasFactory;

    protected $fillable = [
        "learning_id", 
        "battle_style_id",
    ];
}
