<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Replicado\ReplicadoSubject;

/**
 * @extends Model<GroupSubject>
 */
class GroupSubject extends Model
{   
    use HasFactory;
    
    protected $table = 'group_subjects';
    
    /**
     * @var list<string>
     */
    protected $fillable = [
        'group_id',
        'subject_code',
    ];

    /**
     * Get the group that owns the GroupSubject
     * @return BelongsTo<Group, GroupSubject>
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * Get the subject that owns the GroupSubject
     * @return BelongsTo<ReplicadoSubject, GroupSubject>
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(ReplicadoSubject::class, 'subject_code', 'code');
    }
}
