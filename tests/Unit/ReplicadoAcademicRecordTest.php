<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\ReplicadoAcademicRecord;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;

class ReplicadoAcademicRecordTest extends TestCase
{
	// use RefreshDatabase;

	private function assertValidAcamicRecord($academicRecord): void
	{
		$this->assertNotNull($academicRecord);
		$this->assertIsNumeric($academicRecord->nusp);
		$this->assertIsString($academicRecord->subject_code);
		$this->assertIsNumeric($academicRecord->class_code);
	}

	public function test_curriculum_retrieves_fake_data_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
		
		$academicRecord = ReplicadoAcademicRecord::first();
		
		$this->assertValidAcamicRecord($academicRecord);
	}

	public function test_curriculum_returns_multiple_fake_records_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
	 
		$academicRecords = ReplicadoAcademicRecord::take(10)->get();
		
		$this->assertGreaterThan(0, $academicRecords->count());
		$this->assertLessThanOrEqual(10, $academicRecords->count());
		
		foreach ($academicRecords as $academicRecord) {
			$this->assertValidAcamicRecord($academicRecord);
		}
	}

	public function test_curriculum_uses_real_query_when_replicado_available(): void
	{
		$academicRecord = new ReplicadoAcademicRecord();
		$query = $academicRecord->newQuery();
		
		$this->assertNotNull($query);
		$this->assertTrue(method_exists($academicRecord, 'newQuery'));
	}

	public function test_curriculum_query_works_when_replicado_available(): void	
	{
		$academicRecord = ReplicadoAcademicRecord::first();
		$this->assertValidAcamicRecord($academicRecord); 
	}

	public function test_curriculum_returns_multiple_records_when_replicado_available(): void
	{   
		$academicRecords = ReplicadoAcademicRecord::take(5)->get();
		
		$this->assertGreaterThan(0, $academicRecords->count());
		$this->assertLessThanOrEqual(5, $academicRecords->count());
		
		foreach ($academicRecords as $academicRecord) {
			$this->assertValidAcamicRecord($academicRecord);
		}
	}
}
