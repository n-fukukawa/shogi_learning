<?php

namespace Tests\Feature;

use App\Models\Learning;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteLearningTest extends TestCase
{
    use RefreshDatabase;

    public function test_delete_learning(): void
    {
        $user = User::factory()->has(Learning::factory())->create();
        $target = $user->learnings()->first();

        $response = $this->actingAs($user)->deleteJson("/learning/$target->id");

        $this->assertNull(Learning::find($target->id));
        $response->assertStatus(200);
    }


    public function test_cannot_delete_others_learning(): void
    {
        $user = User::factory()->has(Learning::factory())->create();
        $target = $user->learnings()->first();
        $eve = User::factory()->create();

        $response = $this->actingAs($eve)->deleteJson("/learning/$target->id");

        $response->assertStatus(403);
    }


    public function test_cannot_delete_notexists_learning(): void
    {
        $user = User::factory()->has(Learning::factory())->create();
        $target = Learning::orderBy('id', 'desc')->first();

        $response = $this->actingAs($user)->deleteJson("/learning/".$target->id + 1);

        $response->assertStatus(403);
    }
}
