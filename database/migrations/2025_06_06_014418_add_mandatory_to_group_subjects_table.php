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
        Schema::table('group_subjects', function (Blueprint $table) {
            $table->boolean('mandatory')->default(false)->after('subject_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('group_subjects', function (Blueprint $table) {
            $table->dropColumn('mandatory');
        });
    }
};
