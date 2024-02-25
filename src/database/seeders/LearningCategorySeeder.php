<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LearningCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("learning_categories")->insert([
            "name" => "定跡",
            "color" => "#8CD5F4",
            "sort_order" => 1,
        ]);
        DB::table("learning_categories")->insert([
            "name" => "手筋",
            "color" => "#AFD896",
            "sort_order" => 2,
        ]);
        DB::table("learning_categories")->insert([
            "name" => "詰将棋",
            "color" => "#F3E677",
            "sort_order" => 3,
        ]);
        DB::table("learning_categories")->insert([
            "name" => "棋譜並べ",
            "color" => "#EAAC80",
            "sort_order" => 4,
        ]);
        DB::table("learning_categories")->insert([
            "name" => "動画",
            "color" => "#D98BEC",
            "sort_order" => 5,
        ]);
        DB::table("learning_categories")->insert([
            "name" => "対局",
            "color" => "#E78383",
            "sort_order" => 6,
        ]);
        DB::table("learning_categories")->insert([
            "name" => "観戦",
            "color" => "#DBDBDB",
            "sort_order" => 7,
        ]);
    }
}
