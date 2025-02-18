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
        Schema::create('grupos', function ($table) {
            $table->id();
            $table->string('titulo');
            $table->string('descricao');
            $table->unsignedBigInteger('id_grupo_pai')->nullable();
            $table->timestamps();
        });

        Schema::table('grupos', function (Blueprint $table) {
            $table->foreign('id_grupo_pai')->references('id')->on('grupos')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grupos');
    }
};
