<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoStudent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;

class ReplicadoStudentModelTest extends TestCase
{
    // use RefreshDatabase;

    private function assertValidStudent($student): void
	{
		$this->assertNotNull($student);
		$this->assertIsNumeric($student->nusp);
		$this->assertIsNumeric($student->major_id);
		$this->assertIsNumeric($student->habilitation_id);
        $this->assertIsString($student->name);
	}

	public function test_student_retrieves_fake_data_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
		
		$student = ReplicadoStudent::first();
		
		$this->assertValidStudent($student);
	}

	public function test_student_returns_multiple_fake_records_when_replicado_not_available(): void
	{
		Config::set('services.replicado_is_active', 0);
	 
		$students = Replicadostudent::take(10)->get();
		
		$this->assertGreaterThan(0, $students->count());
		$this->assertLessThanOrEqual(10, $students->count());
		
		foreach ($students as $student) {
			$this->assertValidstudent($student);
		}
	}

	public function test_student_uses_real_query_when_replicado_available(): void
	{
		$curriculum = new ReplicadoStudent();
		$query = $curriculum->newQuery();
		
		$this->assertNotNull($query);
		$this->assertTrue(method_exists($curriculum, 'newQuery'));
	}

	public function test_student_query_works_when_replicado_available(): void	
	{
		$curriculum = ReplicadoStudent::first();
		$this->assertValidStudent($curriculum); 
	}

	public function test_student_returns_multiple_records_when_replicado_available(): void
	{   
		$curricula = ReplicadoStudent::take(5)->get();
		
		$this->assertGreaterThan(0, $curricula->count());
		$this->assertLessThanOrEqual(5, $curricula->count());
		
		foreach ($curricula as $curriculum) {
			$this->assertValidStudent($curriculum);
		}
	}
}
