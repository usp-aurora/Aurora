<?php

namespace App\Models;

use App\Enums\CompletionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * @extends Model<CompletionRequirement>
 */
class CompletionRequirement extends Model
{
    use HasFactory;
    
    protected $table = 'completion_requirements';
    
    /**
     * @var list<string>
     */
    protected $fillable = [
        'type',
        'completion_value',
        'group_id'
    ];

    /**
     * Cast the type attribute to CompletionType enum
     * @return Attribute<CompletionType|null, CompletionType|string>
     */
    protected function type(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => CompletionType::tryFrom($value),
            set: fn (CompletionType|string $value) => $value instanceof CompletionType ? $value->value : $value,
        );
    }
}
