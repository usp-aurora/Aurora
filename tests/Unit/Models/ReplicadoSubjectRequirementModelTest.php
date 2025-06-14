<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoSubjectRequirement;
use Illuminate\Support\Facades\Config;

class ReplicadoSubjectRequirementModelTest extends TestCase
{
    private function assertValidSubjectRequirement($requirement): void
    {
        $this->assertNotNull($requirement);
        $this->assertIsString($requirement->subject_code);
        $this->assertIsString($requirement->required_subject_code);
    }

    public function test_subject_requirement_retrieves_fake_data_when_replicado_not_available(): void
    {
        Config::set('services.replicado_is_active', 0);
        
        $requirement = ReplicadoSubjectRequirement::first();
        $this->assertValidSubjectRequirement($requirement);
    }

    public function test_subject_requirement_returns_multiple_fake_records(): void
    {
        Config::set('services.replicado_is_active', 0);
     
        $requirements = ReplicadoSubjectRequirement::take(10)->get();
        
        $this->assertGreaterThan(0, $requirements->count());
        $this->assertLessThanOrEqual(10, $requirements->count());
        
        foreach ($requirements as $requirement) {
            $this->assertValidSubjectRequirement($requirement);
        }
    }

    public function test_subject_requirement_uses_real_query_when_replicado_available(): void
    {
        $requirement = new ReplicadoSubjectRequirement();
        $query = $requirement->newQuery();
        
        $this->assertNotNull($query);
        $this->assertTrue(method_exists($requirement, 'newQuery'));
    }

    public function test_subject_requirement_query_works_when_replicado_available(): void
    {   
		$subject_requirement = ReplicadoSubjectRequirement::first();
		$this->assertValidSubjectRequirement($subject_requirement);
    }

	public function test_subject_requirement_query_returns_multiple_records_when_replicado_available(): void
    {   
		$subject_requirements = ReplicadoSubjectRequirement::take(5)->get();
		$this->assertGreaterThan(0, $subject_requirements->count());
        $this->assertLessThanOrEqual(5, $subject_requirements->count());

		foreach ($subject_requirements as $subject_requirement) {
			$this->assertValidSubjectRequirement($subject_requirement);
		}
    }
}
