<?php

namespace Tests\Feature;

use App\Models\Plan;
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
        $user = User::factory()->create();
        $this->actingAs($user);

        // Create a plan for testing
        Plan::factory()->create([
            'user_id' => $user->id,
            'subject_code' => 'MAC0110',
            'semester' => 1,
        ]);

        $response = $this->getJson('/api/plans/index');
        $response->assertStatus(200)
            ->assertJsonCount(2)
            ->assertJsonStructure([
                0 => [
                    '*' => [
                        'semesterId',
                        'subjects' => [
                            '*' => [
                                'plan',
                                'code',
                                'completed',
                            ],
                        ],
                    ],
                ],
                1 => [],
            ]);

        $responseData = $response->json();
        
        $this->assertEquals(1, $responseData[0][0]['semesterId']);
        $this->assertCount(1, $responseData[0][0]['subjects']);
        $this->assertEquals('MAC0110', $responseData[0][0]['subjects'][0]['code']);
        $this->assertEquals(0, $responseData[0][0]['subjects'][0]['completed']);
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

        $subject1 = "MAC0110";
        $subject2 = "MAC0111";
        $subject3 = "MAC0112";


        $plan1 = Plan::factory()->create(['user_id' => $user->id, 'subject_code' => $subject1, 'semester' => 1]);
        $plan2 = Plan::factory()->create(['user_id' => $user->id, 'subject_code' => $subject2, 'semester' => 1]);

        $payload = [
            ['subject_code' => $subject1, 'semester' => 2], // Update
            ['subject_code' => $subject3, 'semester' => 3], // Create
            ['subject_code' => $subject2, 'semester' => null], // Delete
        ];

        $response = $this->postJson('/api/plans/sync', $payload);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'changedPlans' => [
                    '*' => ['subject_code', 'action'],
                ],
            ]);


        $this->assertDatabaseHas('plans', ['id' => $plan1->id, 'semester' => 2]);
        $this->assertDatabaseHas('plans', ['user_id' => $user->id, 'subject_code' => $subject3, 'semester' => 3]);
        $this->assertDatabaseMissing('plans', ['id' => $plan2->id]);
    }
}
