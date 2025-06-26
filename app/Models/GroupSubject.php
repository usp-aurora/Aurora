<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupSubject extends Model
{   
    use HasFactory;
    
    protected $table = 'group_subjects';
    
    protected $fillable = [
        'group_id',
        'subject_code',
    ];

    /**
     * Get the group that owns the GroupSubject
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * Get the subject that owns the GroupSubject
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class, 'subject_code', 'code');
    }
}
