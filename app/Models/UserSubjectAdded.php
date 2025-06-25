<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSubjectAdded extends Model
{
    use HasFactory;

    protected $table = 'user_subjects_added';

    protected $fillable = [
        'user_id',
        'group_id',
        'subject_code',
    ];

    /**
     * Get the user that owns the UserSubjectAdded
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the group that owns the UserSubjectAdded
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * Get the subject that owns the UserSubjectAdded
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class, 'subject_code', 'code');
    }
}
