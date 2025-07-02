<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @extends Model<Curriculum>
 */
class Curriculum extends Model
{
    use HasFactory;
    
    protected $table = 'curriculums';
    
    /**
     * @var list<string>
     */
    protected $fillable = [
        'course_id',
        'group_id',
    ];

    /**
     * Get the course that owns the Curriculum
     * @return BelongsTo<Course, Curriculum>
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the group that owns the Curriculum
     * @return BelongsTo<Group, Curriculum>
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
