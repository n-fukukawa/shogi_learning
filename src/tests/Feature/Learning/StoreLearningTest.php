<?php

namespace Tests\Feature;

use App\Models\LearningCategory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StoreLearningTest extends TestCase
{
    public function test_learning_create_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_store_learning(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/learning/store', [
            'user_id' => $user->id,
            'learning_at' => Carbon::now()->format('Y-m-d'),
            'category_id' => LearningCategory::find(1)->id,
            'learning_time' => 30,
            'title' => 'fake-title',
        ]);

        $this->assertDatabaseHas('learnings', [
            'user_id' => $user->id, 
            'title' => 'fake-title',
        ]);

        $response->assertStatus(200);
    }
}
