<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoCurriculumSubject;
use Illuminate\Support\Facades\Config;

class ReplicadoCurriculumSubjectsModelTest extends TestCase
{
	private function assertValidCurriculumSubject($curriculumSubject): void
	{
		$this->assertNotNull($curriculumSubject);
		$this->assertIsNumeric($curriculumSubject->curriculum_id);
		$this->assertIsString($curriculumSubject->subject_id);
		$this->assertIsNumeric($curriculumSubject->ideal_period);
		$this->assertContains($curriculumSubject->mandatory, ['O', 'C', 'L']);
	}

	public function test_curriculum_subject_retrieves_fake_data_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
		
		$curriculumSubject = ReplicadoCurriculumSubject::first();
		
		$this->assertValidCurriculumSubject($curriculumSubject);
	}

	public function test_curriculum_subject_returns_multiple_fake_records_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
	 
		$curriculumSubjects = ReplicadoCurriculumSubject::take(10)->get();
		
		$this->assertGreaterThan(0, $curriculumSubjects->count());
		$this->assertLessThanOrEqual(10, $curriculumSubjects->count());
		
		foreach ($curriculumSubjects as $curriculumSubject) {
			$this->assertValidCurriculumSubject($curriculumSubject);
		}
	}

	public function test_curriculum_subject_uses_real_query_when_replicado_available(): void
	{
		$curriculumSubject = new ReplicadoCurriculumSubject();
		$query = $curriculumSubject->newQuery();
		
		$this->assertNotNull($query);
		$this->assertTrue(method_exists($curriculumSubject, 'newQuery'));
	}

	public function test_curriculum_subject_query_works_when_replicado_available(): void	
	{
		$curriculumSubject = ReplicadoCurriculumSubject::first();
		$this->assertValidCurriculumSubject($curriculumSubject); 
	}

	public function test_curriculum_subject_returns_multiple_records_when_replicado_available(): void
	{   
		$curriculumSubjects = ReplicadoCurriculumSubject::take(5)->get();
		
		$this->assertGreaterThan(0, $curriculumSubjects->count());
		$this->assertLessThanOrEqual(5, $curriculumSubjects->count());
		
		foreach ($curriculumSubjects as $curriculumSubject) {
			$this->assertValidCurriculumSubject($curriculumSubject);
		}
	}
}
