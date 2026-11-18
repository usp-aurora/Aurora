<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->string('code', 16)->primary();
            $table->string('name');
            $table->text('syllabus')->nullable();
            $table->unsignedSmallInteger('lecture_credits');
            $table->unsignedSmallInteger('work_credits');
            $table->timestamp('synced_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
