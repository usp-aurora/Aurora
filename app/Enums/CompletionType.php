<?php

namespace App\Enums;

enum CompletionType: string
{
    case CREDITS = 'credits';
    case SUBJECTS = 'subjects';
    case SUBGROUPS = 'subgroups';

    /**
     * Get the human-readable label for the completion type
     */
    public function label(): string
    {
        return match($this) {
            self::CREDITS => 'Créditos',
            self::SUBJECTS => 'Matérias',
            self::SUBGROUPS => 'Blocos',
        };
    }

    /**
     * Get all valid completion type values
     * @return string[]
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get all labels mapped to their values
     * @return array<string, string>
     */
    public static function labels(): array
    {
        $labels = [];
        foreach (self::cases() as $case) {
            $labels[$case->value] = $case->label();
        }
        return $labels;
    }
}
