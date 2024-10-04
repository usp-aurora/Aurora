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
        Schema::create('materias_grupo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_grupo')->references('id')->on('grupos')->onUpdate('cascade');
            $table->foreignId('id_materia')->references('id')->on('materias')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materias_grupo');
    }
};
