<?php

namespace Tests\Unit\Services;

use App\Services\SubjectCatalog;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Tests\TestCase;

class SubjectCatalogTest extends TestCase
{
    public function test_replication_is_preferred(): void
    {
        config(['services.replicado_is_active' => true]);
        $catalog = $this->catalog(false);
        $this->assertSame('USP', $catalog->get(['MAC0110'])->first()->name);
    }

    public function test_local_catalog_is_used_after_replication_fails(): void
    {
        config(['services.replicado_is_active' => true]);
        $catalog = $this->catalog(true);
        $this->assertSame('Local', $catalog->get(['MAC0110'])->first()->name);
    }

    public function test_empty_fallback_fails_explicitly(): void
    {
        config(['services.replicado_is_active' => true]);
        $this->expectException(\Symfony\Component\HttpKernel\Exception\HttpException::class);
        $this->catalog(true)->get(['MISSING']);
    }

    public function test_local_catalog_is_used_directly_without_replication(): void
    {
        config(['services.replicado_is_active' => false]);
        $this->assertSame('Local', $this->catalog(false)->get(['MAC0110'])->first()->name);
    }

    private function catalog(bool $fails): SubjectCatalog
    {
        return new class($fails) extends SubjectCatalog {
            public function __construct(private bool $fails) {}
            protected function replicated(array $codes): Collection
            {
                if ($this->fails) {
                    throw new QueryException('replicado', 'select', [], new \PDOException('offline'));
                }
                return collect([(object) ['code' => 'MAC0110', 'name' => 'USP']]);
            }
            protected function local(array $codes): Collection
            {
                return in_array('MAC0110', $codes) ? collect([(object) ['code' => 'MAC0110', 'name' => 'Local']]) : collect();
            }
        };
    }
}
