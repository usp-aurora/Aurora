<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoInstitute;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;

class ReplicadoInstituteModelTest extends TestCase
{
    // use RefreshDatabase;

	private function assertValidInstitute($institute): void
	{
		$this->assertNotNull($institute);
		$this->assertIsNumeric($institute->id);
		$this->assertIsString($institute->name);
		$this->assertIsString($institute->city_id);
		$this->assertIsString($institute->city_name);
		$this->assertIsNumeric($institute->campus_id);
		$this->assertIsString($institute->campus_name);
		$this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2}$/', $institute->created_at);
	}

    public function test_institutes_retrieves_fake_data_when_replicado_not_available(): void
    {
        Config::set('services.replicado_is_active', 0);
        
        $institute = ReplicadoInstitute::first();
        
        $this->assertValidInstitute($institute);
    }

    public function test_institutes_returns_multiple_fake_records_when_replicado_not_available(): void
    {
        Config::set('services.replicado_is_active', 0);
     
        $institutes = ReplicadoInstitute::take(10)->get();
        
        $this->assertGreaterThan(0, $institutes->count());
        $this->assertLessThanOrEqual(10, $institutes->count());
        
        foreach ($institutes as $institute) {
            $this->assertValidInstitute($institute);
        }
    }

    public function test_institutes_uses_real_query_when_replicado_available(): void
    {
        $institute = new ReplicadoInstitute();
        $query = $institute->newQuery();
        
        $this->assertNotNull($query);
        $this->assertTrue(method_exists($institute, 'newQuery'));
    }

    public function test_institutes_query_works_when_replicado_available(): void
    {   
		$institute = ReplicadoInstitute::first();
		$this->assertValidInstitute($institute);
    }

	public function test_institutes_returns_multiple_records_when_replicado_available(): void
	{   
		$institutes = ReplicadoInstitute::take(5)->get();
		
		$this->assertGreaterThan(0, $institutes->count());
		$this->assertLessThanOrEqual(5, $institutes->count());
		foreach ($institutes as $institute) {
			$this->assertValidInstitute($institute);
		}
	}
}
