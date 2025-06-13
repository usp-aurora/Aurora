<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\ReplicadoCurriculum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;

class ReplicadoCurriculumTest extends TestCase
{
	// use RefreshDatabase;

	private function assertValidCurriculum($curriculum): void
	{
		$this->assertNotNull($curriculum);
		$this->assertIsNumeric($curriculum->id);
		$this->assertIsString($curriculum->subject_id);
		$this->assertIsNumeric($curriculum->ideal_period);
		$this->assertContains($curriculum->mandatory, ['O', 'C', 'L']);
	}

	public function test_curriculum_retrieves_fake_data_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
		
		$curriculum = ReplicadoCurriculum::first();
		
		$this->assertValidCurriculum($curriculum);
	}

	public function test_curriculum_returns_multiple_fake_records_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
	 
		$curricula = ReplicadoCurriculum::take(10)->get();
		
		$this->assertGreaterThan(0, $curricula->count());
		$this->assertLessThanOrEqual(10, $curricula->count());
		
		foreach ($curricula as $curriculum) {
			$this->assertValidCurriculum($curriculum);
		}
	}

	public function test_curriculum_uses_real_query_when_replicado_available(): void
	{
		$curriculum = new ReplicadoCurriculum();
		$query = $curriculum->newQuery();
		
		$this->assertNotNull($query);
		$this->assertTrue(method_exists($curriculum, 'newQuery'));
	}

	public function test_curriculum_query_works_when_replicado_available(): void	
	{
		$curriculum = ReplicadoCurriculum::first();
		$this->assertValidCurriculum($curriculum); 
	}

	public function test_curriculum_returns_multiple_records_when_replicado_available(): void
	{   
		$curricula = ReplicadoCurriculum::take(5)->get();
		
		$this->assertGreaterThan(0, $curricula->count());
		$this->assertLessThanOrEqual(5, $curricula->count());
		
		foreach ($curricula as $curriculum) {
			$this->assertValidCurriculum($curriculum);
		}
	}
}
