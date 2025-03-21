<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Institutes;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InstituteTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if the Institute model can retrieve data correctly.
     */
    public function test_institute_model_retrieves_data_correctly(): void
    {
        $institute = Institutes::first();
        $this->assertNotNull($institute);
        $this->assertIsString($institute->name_institute);
        $this->assertIsInt($institute->id_institute);
    }
}
