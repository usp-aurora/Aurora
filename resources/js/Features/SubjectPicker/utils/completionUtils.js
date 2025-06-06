import memoize from 'lodash/memoize';

/**
 * Maps requirement types to their metric keys
 */
const requirementTypes = {
    "Créditos": "créditos",
    "Matérias": "disciplinas",
    "Blocos": "blocos",
};

/**
 * Initialize a new metrics object
 */
const createMetrics = () => ({
    créditos: 0,
    disciplinas: 0,
    blocos: 0,
    mandatoryMet: true
});

/**
 * Safely get credits from subject data
 */
const getSubjectCredits = (subject) => {
    if (!subject?.credits?.length) return 0;
    return (subject.credits[0] || 0) + (subject.credits[1] || 0);
};

/**
 * Pure version of the metrics calculator (receives recursive call fn)
 */
const _calculateGroupMetrics = (
    group,
    plansSet,
    subjectDataMap,
    recurse // <- the memoized function is passed here
) => {
    console.log("Calculating metrics for group:", group.id);
    const metrics = createMetrics();
    const processedSubjects = new Set();

    if (group.subjects) {
        const mandatoryMet = group.subjects
            .filter(subject => subject.mandatory)
            .every(subject => plansSet.has(subject.code));
        
        metrics.mandatoryMet = mandatoryMet;

        group.subjects.forEach(subject => {
            if (!plansSet.has(subject.code) || processedSubjects.has(subject.code)) return;

            processedSubjects.add(subject.code);
            if (!subject.mandatory) {
                metrics.créditos += getSubjectCredits(subjectDataMap[subject.code]);
                metrics.disciplinas += 1;
            }
        });
    }

    if (group.subgroups) {
        group.subgroups.forEach(subgroup => {
            const subMetrics = recurse(subgroup, plansSet, subjectDataMap);

            if (subgroup.mandatory) {
                metrics.mandatoryMet &&= subMetrics.mandatoryMet;
            }

            if (isComplete(subgroup, subMetrics)) {
                metrics.blocos += 1;
            }

            subgroup.subjects?.forEach(subject => {
                if (!plansSet.has(subject.code) || processedSubjects.has(subject.code)) return;

                processedSubjects.add(subject.code);
                metrics.créditos += getSubjectCredits(subjectDataMap[subject.code]);
                metrics.disciplinas += 1;
            });
        });
    }

    return metrics;
};

/**
 * Check if a group meets all requirements
 */
const isComplete = (group, metrics) => {
    if (!metrics.mandatoryMet) return false;
    if (!group.completionRequirements?.length) return true;

    return group.completionRequirements.every(requirement => {
        const metricKey = requirementTypes[requirement.type];
        return metrics[metricKey] >= requirement.value;
    });
};

// ⚡️ Build the memoized version here with self-reference via closure
const memoizedCalculateGroupMetrics = memoize(
    (group, plansSet, subjectDataMap) =>
        _calculateGroupMetrics(group, plansSet, subjectDataMap, memoizedCalculateGroupMetrics),
    (group, _plansSet, _subjectDataMap) => group.id
);

/**
 * Clear memoization cache
 */
const clearCalculationCache = () => {
    memoizedCalculateGroupMetrics.cache.clear();
};

// 🧠 Exported as calculateRequirements
export {
    isComplete,
    memoizedCalculateGroupMetrics as calculateRequirements,
    requirementTypes,
    clearCalculationCache
};