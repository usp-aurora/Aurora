<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function subject() {
        return $this->belongsTo(\App\Models\Subject::class, 'subject_code', 'code');
    }
}
