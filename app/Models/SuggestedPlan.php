<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Replicado\ReplicadoSubject;

/**
 * @extends Model<SuggestedPlan>
 */
class SuggestedPlan extends Model
{
    use HasFactory;
    protected $table = 'suggested_plans';
    
    /**
     * @var list<string>
     */
    protected $fillable = [
        'semester',
        'subject_code',
    ];

    /**
     * Get the subject associated with the suggested plan.
     * @return BelongsTo<ReplicadoSubject, SuggestedPlan>
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(ReplicadoSubject::class, 'subject_code', 'code');
    }
}
