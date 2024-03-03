<?php

namespace Tests\Feature;

use App\Models\Learning;
use App\Models\LearningCategory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EditLearningTest extends TestCase
{
    public function test_edit_learning(): void
    {
        $user = User::factory()->has(Learning::factory())->create();
        $user->save();

        $target = $user->learnings()->first();

        $category = LearningCategory::inRandomOrder()->first();
        $time = random_int(10, 300);
        $at = Carbon::today()->format('Y-m-d');
        $title = 'test title';

        $response = $this->actingAs($user)->putJson("/learning/{$target->id}", [
            ...$target->toArray(),
            'category_id' => $category->id,
            'learning_at' => $at,
            'learning_time' => $time,
            'title' => $title,
        ]);

        $updated = Learning::find($target->id);

        $this->assertEquals($time, $updated->learning_time);
        $this->assertEquals(
            Carbon::parse($at)->getTimestamp(), 
            Carbon::parse($updated->learning_at)->getTimestamp()
        );
        $this->assertEquals($category->id, $updated->category_id);
        $this->assertEquals($title, $updated->title);

        $response->assertStatus(200);
    }


    public function test_cannot_fill_zero_learning_time(): void
    {
        $user = User::factory()->has(Learning::factory())->create();
        $user->save();

        $target = $user->learnings()->first();

        $time = 0;

        $response = $this->actingAs($user)->putJson("/learning/{$target->id}", [
            ...$target->toArray(),
            'learning_time' => $time,
        ]);

        $response->assertStatus(422);
    }


    public function test_cannot_edit_others_learning(): void
    {
        $user = User::factory()->has(Learning::factory())->create();
        $user->save();

        $target = $user->learnings()->first();

        $time = random_int(10, 300);

        $eve = User::factory()->create();
        $eve->save();

        $response = $this->actingAs($eve)->putJson("/learning/{$target->id}", [
            ...$target->toArray(),
            'learning_time' => $time,
        ]);

        $response->assertStatus(403);
    }


    public function test_cannot_edit_unexists_learning(): void
    {
        $user = User::factory()->has(Learning::factory())->create();
        $user->save();

        $target = Learning::orderBy('id', 'desc')->first();

        $time = random_int(10, 300);

        $response = $this->actingAs($user)->putJson("/learning/".$target->id + 1, [
            ...$target->toArray(),
            'learning_time' => $time,
        ]);

        $response->assertStatus(403);
    }
}
