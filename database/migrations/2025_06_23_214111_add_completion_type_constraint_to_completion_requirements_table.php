<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\CompletionType;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('completion_requirements', function (Blueprint $table) {
            $validTypes = CompletionType::values();
            $table->enum('type', $validTypes)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('completion_requirements', function (Blueprint $table) {
            $table->string('type')->change();
        });
    }
};
