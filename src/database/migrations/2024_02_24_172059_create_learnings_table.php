<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('learnings', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId("category_id")->constrained(table: "learning_categories");
            $table->string("title", 100)->nullable();
            $table->string("comment", 500)->nullable();
            $table->integer("learning_time");
            $table->date("learning_at");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learnings');
    }
};
