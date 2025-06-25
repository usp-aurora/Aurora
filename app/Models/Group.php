<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Group extends Model
{
    use HasFactory;
    
    protected $table = 'groups';
    
    protected $fillable = [
        'title',
        'description',
        'parent_group_id',
        'is_course_root',
    ];

    /**
     * Get the parent group
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'parent_group_id');
    }

    /**
     * Get the subgroups
     */
    public function subgroups(): HasMany
    {
        return $this->hasMany(Group::class, 'parent_group_id');
    }

    /**
     * Get the group subjects
     */
    public function groupSubjects(): HasMany
    {
        return $this->hasMany(GroupSubject::class);
    }

    /**
     * Get the user subjects added
     */
    public function userSubjectsAdded(): HasMany
    {
        return $this->hasMany(UserSubjectAdded::class);
    }

    /**
     * Get the curriculum
     */
    public function curriculum(): HasMany
    {
        return $this->hasMany(Curriculum::class);
    }
}
