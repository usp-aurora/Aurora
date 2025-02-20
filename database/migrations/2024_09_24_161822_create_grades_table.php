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
<<<<<<< HEAD:database/migrations/2024_09_07_050542_create_subjects_table.php
        Schema::create('subjects', function (Blueprint $table) {
            $table->string('code')->primary();
            $table->string('name');
            $table->string('syllabus');
            $table->string('lecture_credits');
            $table->string('work_credits');
=======
        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_curso')->references('id')->on('cursos')->onUpdate('cascade');
            $table->foreignId('id_grupo')->references('id')->on('grupos')->onUpdate('cascade');
>>>>>>> c60579ab04d2b22074311f1020975e3bb505b303:database/migrations/2024_09_24_161822_create_grades_table.php
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
