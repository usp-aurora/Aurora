<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAddedSubjects extends Model
{
    use HasFactory;

    protected $table = 'user_added_subjects';

    protected $fillable = [
        'user_id',
        'group_id',
        'subject_code',
    ];

    /**
     * Get the user that owns the UserAddedSubjects
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the group that owns the UserAddedSubjects
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
