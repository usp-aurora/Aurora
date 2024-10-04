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
        Schema::create('criterios_completude', function (Blueprint $table) {
            $table->id();
            $table->string('tipo');
            $table->string('valor_completude');
            $table->foreignId('id_grupo')->references('id')->on('grupos')->onUpdate('cascade');
            $table->timestamp('updated_at');
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('criterios_completude');
    }
};
