<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'code',
        'name',
        'description',
        'credits',
    ];

    /**
     * Get the group subjects
     */
    public function groupSubjects(): HasMany
    {
        return $this->hasMany(GroupSubject::class, 'subject_code', 'code');
    }

    /**
     * Get the user subjects added
     */
    public function userSubjectsAdded(): HasMany
    {
        return $this->hasMany(UserSubjectAdded::class, 'subject_code', 'code');
    }
}