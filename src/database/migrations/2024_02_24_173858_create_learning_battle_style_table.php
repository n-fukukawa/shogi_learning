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
        Schema::create('learning_battle_style', function (Blueprint $table) {
            $table->id();
            $table->foreignId("learning_id")->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId("battle_style_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learning_battle_style');
    }
};
