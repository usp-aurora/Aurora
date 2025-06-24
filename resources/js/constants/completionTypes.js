/**
 * Completion type constants that mirror the backend CompletionType enum.
 * These values must match exactly with the backend enum values.
 * @readonly
 */
export const COMPLETION_TYPES = {
    CREDITS: 'credits',
    SUBJECTS: 'subjects',
    SUBGROUPS: 'subgroups'
};

/**
 * Maps completion types to their Portuguese labels.
 * Used for display purposes in the frontend.
 * @readonly
 */
export const COMPLETION_TYPE_LABELS = {
    [COMPLETION_TYPES.CREDITS]: 'Créditos',
    [COMPLETION_TYPES.SUBJECTS]: 'Matérias',
    [COMPLETION_TYPES.SUBGROUPS]: 'Blocos'
};
