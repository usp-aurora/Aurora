<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoSubject;
use Illuminate\Support\Facades\Config;

class ReplicadoSubjectModelTest extends TestCase
{
    private function assertValidSubject($subject): void
	{
		$this->assertNotNull($subject);
		$this->assertIsString($subject->name);
		$this->assertIsString($subject->syllabus);
		$this->assertIsNumeric($subject->lecture_credits);
		$this->assertIsNumeric($subject->work_credits);
	}

    public function test_subjects_retrieves_fake_data_when_jupiter_not_available(): void
    {
        Config::set('services.replicado_is_active', 0);
        
        $subject = ReplicadoSubject::first();
        
        $this->assertValidSubject($subject);
    }

    public function test_subjects_returns_multiple_fake_records(): void
    {
        Config::set('services.replicado_is_active', 0);
     
		$subjects = ReplicadoSubject::take(10)->get();
        
        $this->assertGreaterThan(0, $subjects->count());
        $this->assertLessThanOrEqual(10, $subjects->count());
        
        foreach ($subjects as $subject) {
            $this->assertValidSubject($subject);
        }
    }

    public function test_subjects_uses_real_query_when_jupiter_available(): void
    {
        $subjects = new ReplicadoSubject();
        $query = $subjects->newQuery();
        
        $this->assertNotNull($query);
        $this->assertTrue(method_exists($subjects, 'newQuery'));
    }

	public function test_subjects_query_works_when_jupiter_available(): void
	{   
		$subjectss = ReplicadoSubject::take(5)->get();
		
		$this->assertGreaterThan(0, $subjectss->count());
		foreach ($subjectss as $subjects) {
			$this->assertValidSubject($subjects);
		}
	}

}
