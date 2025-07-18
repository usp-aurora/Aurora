<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoAcademicRecord;
use Illuminate\Support\Facades\Config;

class ReplicadoAcademicRecordModelTest extends TestCase
{
	private function assertValidAcademicRecord($academicRecord): void
	{
		$this->assertNotNull($academicRecord);
		$this->assertIsNumeric($academicRecord->nusp);
		$this->assertIsString($academicRecord->subject_code);
		$this->assertIsNumeric($academicRecord->class_code);
		$this->assertIsNumeric($academicRecord->program_code);
		$this->assertContains($academicRecord->status, ['A', 'D']);
	}

	public function test_academic_record_retrieves_fake_data_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
		
		$academicRecord = ReplicadoAcademicRecord::first();
		
		$this->assertValidAcademicRecord($academicRecord);
	}

	public function test_academic_record_returns_multiple_fake_records_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
	 
		$academicRecords = ReplicadoAcademicRecord::take(10)->get();
		
		$this->assertGreaterThan(0, $academicRecords->count());
		$this->assertLessThanOrEqual(10, $academicRecords->count());
		
		foreach ($academicRecords as $academicRecord) {
			$this->assertValidAcademicRecord($academicRecord);
		}
	}

	public function test_academic_record_uses_real_query_when_replicado_available(): void
	{
		$academicRecord = new ReplicadoAcademicRecord();
		$query = $academicRecord->newQuery();
		
		$this->assertNotNull($query);
		$this->assertTrue(method_exists($academicRecord, 'newQuery'));
	}

	public function test_academic_record_query_works_when_replicado_available(): void	
	{
		$academicRecord = ReplicadoAcademicRecord::first();
		$this->assertValidAcademicRecord($academicRecord); 
	}

	public function test_academic_record_returns_multiple_records_when_replicado_available(): void
	{   
		$academicRecords = ReplicadoAcademicRecord::take(5)->get();
		
		$this->assertGreaterThan(0, $academicRecords->count());
		$this->assertLessThanOrEqual(5, $academicRecords->count());
		
		foreach ($academicRecords as $academicRecord) {
			$this->assertValidAcademicRecord($academicRecord);
		}
	}
}
