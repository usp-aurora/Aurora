<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            // Hash do id de sessão, para contar visitantes anônimos sem guardar dados pessoais.
            $table->string('visitor_hash', 64)->nullable();
            $table->string('event', 64);
            $table->json('properties')->nullable();
            // Dia do evento no fuso de config('metrics.timezone').
            $table->date('occurred_on');
            $table->timestamp('created_at')->useCurrent();

            $table->index(['event', 'occurred_on']);
            $table->index(['occurred_on', 'user_id']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('last_login_at')->nullable();
            $table->timestamp('last_seen_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_events');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['last_login_at', 'last_seen_at']);
        });
    }
};
