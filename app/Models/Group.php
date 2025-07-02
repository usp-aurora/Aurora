<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @extends Model<Group>
 */
class Group extends Model
{
    use HasFactory;
    
    protected $table = 'groups';
    
    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'parent_group_id',
        'is_course_root',
    ];

    /**
     * Get the parent group
     * @return BelongsTo<Group, Group>
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'parent_group_id');
    }

    /**
     * Get the subgroups
     * @return HasMany<Group>
     */
    public function subgroups(): HasMany
    {
        return $this->hasMany(Group::class, 'parent_group_id');
    }

    /**
     * Get the group subjects
     * @return HasMany<GroupSubject>
     */
    public function groupSubjects(): HasMany
    {
        return $this->hasMany(GroupSubject::class);
    }

    /**
     * Get the user subjects added
     * @return HasMany<UserAddedSubject>
     */
    public function userSubjectsAdded(): HasMany
    {
        return $this->hasMany(UserAddedSubject::class);
    }

    /**
     * Get the curriculum
     * @return HasMany<Curriculum>
     */
    public function curriculum(): HasMany
    {
        return $this->hasMany(Curriculum::class);
    }
}
