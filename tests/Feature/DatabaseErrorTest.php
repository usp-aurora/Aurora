<?php

namespace Tests\Feature;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Route;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class DatabaseErrorTest extends TestCase
{
    public static function connections(): array
    {
        return [
            ['replicado', 'servidores da USP'],
            ['mysql', 'banco de dados local'],
        ];
    }

    #[DataProvider('connections')]
    public function test_database_errors_identify_the_service_without_exposing_details(string $connection, string $service): void
    {
        Route::get('/database-error-test', function () use ($connection) {
            throw new QueryException($connection, 'SELECT private_data', [], new \PDOException('private-host secret-password'));
        });

        $this->get('/database-error-test')
            ->assertStatus(503)
            ->assertSee($service)
            ->assertDontSee('private-host')
            ->assertDontSee('secret-password')
            ->assertDontSee('SELECT private_data');

        $this->getJson('/database-error-test')
            ->assertStatus(503)
            ->assertJsonPath('service', $service)
            ->assertDontSee('secret-password');
    }
}
