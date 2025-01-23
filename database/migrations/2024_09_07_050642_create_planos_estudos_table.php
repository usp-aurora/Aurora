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
        Schema::create('planos_estudos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('codigo_materia');
            $table->foreignId('id_usuario')->references('id')->on('users')->constrained();
            $table->foreign('codigo_materia')->references('codigo_materia')->on('materias')->constrained();
            $table->integer('semestre');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planos_estudos');
    }
};