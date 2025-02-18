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
        Schema::create('subjects_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_group')->references('id')->on('groups')->onUpdate('cascade');
            $table->string('subject_code');
            $table->foreign('subject_code')->references('subject_code')->on('subjects')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects_groups');
    }
};
