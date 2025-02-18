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
        Schema::create('studies_plan', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('subject_code');
            $table->foreignId('id_user')->references('id')->on('users')->constrained();
            $table->foreign('subject_code')->references('subject_code')->on('subjects')->constrained();
            $table->integer('semester');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('studies_plan');
    }
};