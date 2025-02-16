<?php

namespace Tests\Feature;

use App\Models\Plan;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlanControllerTest extends TestCase
{
    use RefreshDatabase;

     /**
     * Test that the index function returns grouped plans by semester.
     *
     * This test ensures that the `index` function:
     * - Returns a successful response.
     * - Structures the returned JSON correctly.
     * - Includes the correct groupings by semester and courses data.
     */
    public function test_index_returns_grouped_plans_by_semester()
    {
        $user = User::where('id', 1)->first();
        $this->actingAs($user);

        $response = $this->getJson('/api/plans/index');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'plans' => [
                    '*' => [
                        'id',
                        'alias',
                        'courses' => [
                            '*' => [ 'plan', 'id', 'code', 'title', 'desc', 'credits', ],
                        ],
                    ],
                ],
            ]);
    }

    /**
     * Test that the sync function processes changes to plans correctly.
     *
     * This test ensures that the `sync` function:
     * - Processes updates to existing plans.
     * - Creates new plans.
     * - Deletes specified plans.
     * - Returns a summary of all changes made during synchronization.
     */
    public function test_sync_processes_plan_changes_correctly()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $subject1 = Subject::factory()->create();
        $subject2 = Subject::factory()->create();
        $subject3 = Subject::factory()->create();
        

        $plan1 = Plan::factory()->create(['user_id' => $user->id, 'subject_id' => $subject1->id, 'semester' => 1]);
        $plan2 = Plan::factory()->create(['user_id' => $user->id, 'subject_id' => $subject2->id, 'semester' => 1]);

        $payload = [
            ['id' => $plan1->id, 'subject_id' => $subject1->id, 'semester' => 2], // Update
            ['id' => null, 'subject_id' => $subject3->id, 'semester' => 3], // Create
            ['id' => $plan2->id, 'subject_id' => $subject2->id, 'semester' => null], // Delete
        ];

        $response = $this->postJson('/api/plans/sync', $payload);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'changedPlans' => [
                    '*' => ['id', 'subject_id', 'action'],
                ],
            ]);
        

        $this->assertDatabaseHas('plans', ['id' => $plan1->id, 'semester' => 2]);
        $this->assertDatabaseHas('plans', ['user_id' => $user->id, 'subject_id' => $subject3->id, 'semester' => 3]);
        $this->assertDatabaseMissing('plans', ['id' => $plan2->id]);
    }


    /**
     * Test that the store function creates a plan correctly.
     */
    public function test_can_create_plan()
    {
        $user = User::factory()->create();
        $subject = Subject::factory()->create();
        $this->actingAs($user);

        $payload = [
            'subject_id' => $subject->id,
            'semester' => 1,
        ];

        $response = $this->postJson('/api/plans', $payload);

        $response->assertStatus(201)
                 ->assertJson([
                     'status' => 'success',
                     'data' => [
                         'subject_id' => $subject->id,
                         'semester' => 1,
                     ]
                 ]);
    }

    /**
     * Test that the update function updates a plan correctly.
     */
    public function test_can_update_plan()
    {
        $user = User::factory()->create();
        $plan = Plan::factory()->for($user)->create();
        $subject = Subject::factory()->create();
        $this->actingAs($user);

        $payload = [
            'subject_id' => $subject->id,
            'semester' => 2,
        ];

        $response = $this->putJson("/api/plans/{$plan->id}", $payload);

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'data' => [
                         'id' => $plan->id,
                         'subject_id' => $subject->id,
                         'semester' => 2,
                     ]
                 ]);
    }

    /**
     * Test that the destroy function deletes a plan correctly.
     */
    public function test_can_delete_plan()
    {
        $user = User::factory()->create();
        $plan = Plan::factory()->for($user)->create();
        $this->actingAs($user);

        $response = $this->deleteJson("/api/plans/{$plan->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'status' => 'success',
                     'message' => 'Plan deleted successfully',
                 ]);

        $this->assertDatabaseMissing('plans', ['id' => $plan->id]);
    }

}
