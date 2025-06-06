<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\User;
use \App\Models\Subject;
use \App\Models\UserOwnSubject;

class Plan extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function subject() {
        if ($this->subject_type === 'user_own_subject') {
            return $this->belongsTo(UserOwnSubject::class, 'subject_code', 'code');
        }
        return $this->belongsTo(Subject::class, 'subject_code', 'code');
    }
}
