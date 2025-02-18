<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('completeness_criteria', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('completeness_value');
            $table->foreignId('id_group')->references('id')->on('groups')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('completeness_criteria');
    }
};
