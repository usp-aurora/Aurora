<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Replicado\ReplicadoSubjectOffering;
use Illuminate\Support\Facades\Config;

class ReplicadoSubjectOfferingModelTest extends TestCase
{
    private function assertValidSubjectOffering($offering): void
    {
        $this->assertNotNull($offering);
        $this->assertIsNumeric($offering->id);
        $this->assertIsString($offering->professor);
        $this->assertIsString($offering->subject_code);
    }

    public function test_subject_offering_when_replicado_not_available_retrieves_fake_data(): void
    {
        Config::set('services.replicado_is_active', 0);
        
        $offering = ReplicadoSubjectOffering::first();
        
        $this->assertValidSubjectOffering($offering);
    }

    public function test_subject_offering_when_replicado_not_available_returns_multiple_fake_records(): void
    {
        Config::set('services.replicado_is_active', 0);
     
        $offerings = ReplicadoSubjectOffering::take(3)->get();
        $this->assertLessThanOrEqual(3, $offerings->count());
        $this->assertGreaterThan(0, $offerings->count());
        foreach ($offerings as $offering) {
            $this->assertValidSubjectOffering($offering);
        }
    }

    public function test_subject_offering_when_replicado_available_uses_real_query(): void
    {
        $offering = new ReplicadoSubjectOffering();
        $query = $offering->newQuery();
        
        $this->assertNotNull($query);
        $this->assertTrue(method_exists($offering, 'newQuery'));
    }

    public function test_subject_offering_when_replicado_available_query_works(): void
    {   
        $offering = ReplicadoSubjectOffering::first();
        $this->assertValidSubjectOffering($offering);
    }

    public function test_subject_offering_when_replicado_available_query_returns_multiple_records(): void
    {   
        $offerings = ReplicadoSubjectOffering::take(5)->get();
        
        $this->assertGreaterThan(0, $offerings->count());
        $this->assertLessThanOrEqual(5, $offerings->count());
        
        foreach ($offerings as $offering) {
            $this->assertValidSubjectOffering($offering);
        }
    }
}
