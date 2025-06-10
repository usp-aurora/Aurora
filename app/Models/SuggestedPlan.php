<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuggestedPlan extends Model
{
    use HasFactory;
    protected $table = 'suggested_plans';
    
    protected $fillable = [
        'semester',
        'subject_code',
    ];

    /**
     * Get the subject associated with the suggested plan.
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_code', 'code');
    }
}
