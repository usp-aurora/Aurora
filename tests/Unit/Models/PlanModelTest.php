<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Plan;
use App\Models\User;
use App\Models\Replicado\ReplicadoSubject;

class PlanModelTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if a plan can be created successfully.
     */
    public function test_it_creation(): void
    {
        // Create user and subject
        $user = User::factory()->create();
        $subject = "MAC0110";

        // Create plan
        $plan = Plan::create([
            'user_id' => $user->id,
            'subject_code' => $subject,
            'semester' => 1,
        ]);

        // Assertions
        $this->assertDatabaseHas('plans', [
            'id' => $plan->id,
            'user_id' => $user->id,
            'subject_code' => $subject,
            'semester' => 1,
        ]);
    }

    /**
     * Test the relationship between Plan and User.
     */
    public function test_it_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $subject = "MAC0110";

        $plan = Plan::create([
            'user_id' => $user->id,
            'subject_code' => $subject,
            'semester' => 1,
        ]);

        $this->assertInstanceOf(User::class, $plan->user);
        $this->assertEquals($user->id, $plan->user->id);
    }

    /**
     * Test the relationship between Plan and Subject.
     */
    // Como não configuramos o replicado para os testes do github actions e não
    // ajustamos o código dos dados falsos para ficar compatível, 
    // esse teste não passa no github actions.
    // public function test_it_belongs_to_subject(): void
    // {
    //     $user = User::factory()->create();
    //     $subject = "MAC0110";

    //     $plan = Plan::create([
    //         'user_id' => $user->id,
    //         'subject_code' => $subject,
    //         'semester' => 1,
    //     ]);

    //     $this->assertInstanceOf(ReplicadoSubject::class, $plan->subject);
    //     $this->assertEquals($subject, $plan->subject_code);
    // }

    /**
     * Test deletion of a plan.
     */
    public function test_it_deletion(): void
    {
        $user = User::factory()->create();
        $subject = "MAC0110";

        $plan = Plan::create([
            'user_id' => $user->id,
            'subject_code' => $subject,
            'semester' => 1,
        ]);

        $plan->delete();

        $this->assertDatabaseMissing('plans', [
            'id' => $plan->id,
        ]);
    }

    /**
     * Test updating a plan's semester.
     */
    public function test_it_update(): void
    {
        $user = User::factory()->create();
        $subject = "MAC0110";

        $plan = Plan::create([
            'user_id' => $user->id,
            'subject_code' => $subject,
            'semester' => 1,
        ]);

        $plan->update(['semester' => 2]);

        $this->assertDatabaseHas('plans', [
            'id' => $plan->id,
            'semester' => 2,
        ]);
    }

    /**
     * Test retrieving plans by user.
     */
    public function test_retrieve_plans_by_user(): void
    {
        $user = User::factory()->create();
        $subject = "MAC0110";

        $plan = Plan::create([
            'user_id' => $user->id,
            'subject_code' => $subject,
            'semester' => 1,
        ]);

        $plans = Plan::where('user_id', $user->id)->get();

        $this->assertCount(1, $plans);
        $this->assertEquals($plan->id, $plans->first()->id);
    }


    /**
     * Test validation when creating a plan without required fields.
     */
    public function test_it_requires_all_fields(): void
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        Plan::create([
            'user_id' => null,
            'subject_code' => null,
            'semester' => null,
        ]);
    }

    /**
     * Test validation when creating a plan with invalid user_id;
     */
    public function test_it_requires_valid_user()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        Plan::factory()->create(['user_id' => 99]);
    }
}