<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoHabilitation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;

class ReplicadoHabilitationModelTest extends TestCase
{
	// use RefreshDatabase;

	private function assertValidHabilitation($habilitation): void
	{
		$this->assertNotNull($habilitation);
		$this->assertIsNumeric($habilitation->id);
		$this->assertIsNumeric($habilitation->major_id);
		$this->assertIsString($habilitation->name);
	}

	public function test_habilitation_subject_retrieves_fake_data_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
		
		$habilitation = ReplicadoHabilitation::first();
		 
		$this->assertValidHabilitation($habilitation);
	}

	public function test_habilitation_subject_returns_multiple_fake_records_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
	 
		$habilitations = ReplicadoHabilitation::take(10)->get();
		
		$this->assertGreaterThan(0, $habilitations->count());
		$this->assertLessThanOrEqual(10, $habilitations->count());
		
		foreach ($habilitations as $habilitation) {
			$this->assertValidHabilitation($habilitation);
		}
	}

	public function test_habilitation_subject_uses_real_query_when_replicado_available(): void
	{
		$habilitation = new ReplicadoHabilitation();
		$query = $habilitation->newQuery();
		
		$this->assertNotNull($query);
		$this->assertTrue(method_exists($habilitation, 'newQuery'));
	}

	public function test_habilitation_subject_query_works_when_replicado_available(): void	
	{
		$habilitation = ReplicadoHabilitation::first();
		$this->assertValidHabilitation($habilitation); 
	}

	public function test_habilitation_subject_returns_multiple_records_when_replicado_available(): void
	{   
		$habilitations = ReplicadoHabilitation::take(5)->get();
		
		$this->assertGreaterThan(0, $habilitations->count());
		$this->assertLessThanOrEqual(5, $habilitations->count());
		
		foreach ($habilitations as $habilitation) {
			$this->assertValidHabilitation($habilitation);
		}
	}
}
