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
        Schema::create('groups', function ($table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('color')->nullable();
            $table->unsignedBigInteger('parent_group_id')->nullable();
            $table->boolean('is_course_root');
            $table->timestamps();
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->foreign('parent_group_id')->references('id')->on('groups')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
