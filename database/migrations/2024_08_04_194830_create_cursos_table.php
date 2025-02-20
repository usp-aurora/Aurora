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
        Schema::create('cursos', function (Blueprint $table) {
            $table->id();
            $table->string('nome_curso');
            $table->integer('id_instituto')->nullable();
            $table->string('grade');
            $table->timestamps();
<<<<<<< HEAD:database/migrations/2024_09_07_050642_create_plans_table.php
            $table->string('subject_code');
            $table->foreign('subject_code')->references('code')->on('subjects')->constrained();
            $table->foreignId('user_id')->references('id')->on('users')->constrained();
            $table->integer('semester');
=======
>>>>>>> c60579ab04d2b22074311f1020975e3bb505b303:database/migrations/2024_08_04_194830_create_cursos_table.php
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};
 