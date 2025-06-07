/**
 * Maps requirement types to their corresponding metric keys in the metrics object.
 * Used for translating completion requirements to their metric counters.
 * @readonly
 * @enum {string}
 */
const requirementTypes = {
    "Créditos": "credits",     // Total credits needed
    "Matérias": "subjects",   // Number of subjects needed
    "Blocos": "subgroups",         // Number of completed subgroups needed
};

/**
 * Creates a new metrics object with default values.
 * Used to track completion progress of groups and subgroups.
 * @returns {Object} Metrics object with initial values
 * @property {number} credits - Total credits accumulated
 * @property {number} subjects - Number of subjects completed
 * @property {number} subgroups - Number of subgroups completed
 * @property {boolean} mandatoryMet - Whether all mandatory requirements are met
 */
const createMetrics = () => ({
    credits: 0,
    subjects: 0,
    subgroups: 0,
    mandatoryMet: true
});

/**
 * Calculates total credits for a subject by summing theoretical and practical credits.
 * Handles null/undefined values safely.
 * @param {Object} subject - Subject data object
 * @param {Array<number>} subject.credits - Array containing [theoretical, practical] credits
 * @returns {number} Total credits for the subject
 */
const getSubjectCredits = (subject) => {
    if (!subject?.credits?.length) return 0;
    return (subject.credits[0] || 0) + (subject.credits[1] || 0);
};

/**
 * Creates a memoized calculator function for computing group metrics.
 * Uses a Map for caching results to avoid recalculating unchanged groups.
 * @returns {Function} Memoized calculation function with cache clearing capability
 */
function createMemoizedCalculator() {
    const cache = new Map();

    /**
     * Calculates metrics for a group and its subgroups with memoization.
     * @param {Object} group - Group to calculate metrics for
     * @param {Set<string>} plansSet - Set of selected subject codes
     * @param {Object} subjectDataMap - Map of subject data by code
     * @returns {Object} Calculated metrics for the group
     */
    function memoizedCalculate(group, plansSet, subjectDataMap) {
        /**
         * Inner recursive function that handles the actual calculation
         * and caches results for each subgroup.
         * @private
         */
        function _calculateGroupMetrics(group) {
            if (cache.has(group.id)) {
                return cache.get(group.id);
            }

            console.debug("Calculating metrics for group:", group.id);
            const metrics = createMetrics();
            const processedSubjects = new Set();

            if (group.subjects) {
                metrics.mandatoryMet = group.subjects
                    .filter(subject => subject.mandatory)
                    .every(subject => plansSet.has(subject.code));

                for (const subject of group.subjects) {
                    const code = subject.code;
                    if (!plansSet.has(code) || processedSubjects.has(code)) continue;

                    processedSubjects.add(code);
                    metrics.credits += getSubjectCredits(subjectDataMap[code]);
                    metrics.subjects += 1;
                }
            }

            if (group.subgroups) {
                for (const subgroup of group.subgroups) {
                    const subMetrics = _calculateGroupMetrics(subgroup);
                    const subCompleted = isComplete(subgroup, subMetrics);

                    if (subgroup.mandatory) {
                        metrics.mandatoryMet &&= subCompleted;
                    }

                    if (subCompleted) {
                        metrics.subgroups += 1;
                    }

                    for (const subject of subgroup.subjects ?? []) {
                        const code = subject.code;
                        if (!plansSet.has(code) || processedSubjects.has(code)) continue;

                        processedSubjects.add(code);
                        metrics.credits += getSubjectCredits(subjectDataMap[code]);
                        metrics.subjects += 1;
                    }
                }
            }

            cache.set(group.id, metrics);
            return metrics;
        }

        return _calculateGroupMetrics(group);
    }

    /**
     * Clears the memoization cache.
     * Should be called when plans change or group structure is modified.
     */
    memoizedCalculate.clearCache = () => cache.clear();

    return memoizedCalculate;
}

/**
 * Determines if a group meets all its completion requirements.
 * A group is complete when:
 * 1. All mandatory subjects/subgroups are completed
 * 2. All numerical requirements (credits, subjects, blocks) are met
 * 
 * @param {Object} group - Group to check completion for
 * @param {Array} group.completionRequirements - Array of requirements
 * @param {Object} metrics - Current metrics for the group
 * @returns {boolean} Whether all requirements are met
 */
const isComplete = (group, metrics) => {
    if (!metrics.mandatoryMet) return false;
    if (!group.completionRequirements?.length) return true;

    return group.completionRequirements.every(requirement => {
        const metricKey = requirementTypes[requirement.type];
        return metrics[metricKey] >= requirement.value;
    });
};

// Create singleton instance of the calculator
const calculateMetrics = createMemoizedCalculator();

/**
 * Clears the global metrics calculation cache.
 * Should be called when:
 * - Plans are modified
 * - Group structure changes
 * - Subject data is updated
 */
const clearCalculationCache = () => {
    calculateMetrics.clearCache();
};

export {
    isComplete,
    calculateMetrics,
    requirementTypes,
    clearCalculationCache
};