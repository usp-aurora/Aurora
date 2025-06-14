<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoMajor;
use Illuminate\Support\Facades\Config;

class ReplicadoMajorModelTest extends TestCase
{
	private function assertValidMajor($major): void
	{
		$this->assertNotNull($major);
		$this->assertIsNumeric($major->major_id);
		$this->assertIsString($major->major_name);
		$this->assertIsNumeric($major->collegiate_id);
	}

    public function test_major_retrieves_fake_data_when_replicado_not_available(): void
    {
        Config::set('services.replicado_is_active', 0);
        
        $major = ReplicadoMajor::first();
		
		$this->assertValidMajor($major);
    }

    public function test_major_returns_multiple_fake_records_when_replicado_not_available(): void
    {
        Config::set('services.replicado_is_active', 0);
     
        $majors = ReplicadoMajor::take(10)->get();
        
        $this->assertGreaterThan(0, $majors->count());
        $this->assertLessThanOrEqual(10, $majors->count());
        
        foreach ($majors as $major) {
			$this->assertValidMajor($major);
        }
    }

    public function test_major_uses_real_query_when_replicado_available(): void
    {
        $major = new ReplicadoMajor();
        $query = $major->newQuery();
        
        $this->assertNotNull($query);
        $this->assertTrue(method_exists($major, 'newQuery'));
    }

    public function test_major_query_works_when_replicado_available(): void
    {   
		$major = ReplicadoMajor::first();
		$this->assertValidMajor($major);
    }

	public function test_major_query_returns_multiple_records_when_replicado_available(): void
    {   
		$majors = ReplicadoMajor::take(5)->get();
		$this->assertGreaterThan(0, $majors->count());
        $this->assertLessThanOrEqual(5, $majors->count());
		foreach ($majors as $major) {
			$this->assertValidMajor($major);
		}
    }
}
