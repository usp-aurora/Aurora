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
 * Calculates completion metrics for a group and its subgroups
 * @param {Object} groupData - The group structure containing subjects and subgroups
 * @param {Set} plansSet - Set of selected subject IDs
 * @param {Object} subjectDataMap - Map of subject data containing credits info
 * @returns {Object} Metrics object with credits, subjects, blocks and mandatory status
 */
function calculateRequirements(groupData, plansSet, subjectDataMap) {
    // Initialize metrics object
    const metrics = {
        "créditos": 0,
        "disciplinas": 0,
        "blocos": 0,
        "mandatoryMet": true  // Tracks if all mandatory requirements are met
    };

    // Early return if no subject data is available
    if (!subjectDataMap) return metrics;

    // Process subjects in the current group
    if (groupData.subjects) {
        // Find and verify mandatory subjects completion
        // const mandatorySubjects = groupData.subjects.filter(subject => subject.mandatory);
        // const allMandatoryCompleted = mandatorySubjects.every(subject => 
        //    plansSet.has(subject)
        // );
        // metrics.mandatoryMet = allMandatoryCompleted;

        // Calculate metrics for each subject
        groupData.subjects.forEach(subject => {
            if (plansSet.has(subject)) {
                const subjectData = subjectDataMap[subject];
                
                // Only count credits/subjects if not mandatory
                // if (!subject.mandatory) {
                    // Sum lecture and work credits
                    metrics[requirementTypes["Créditos"]] += 
                        Number(subjectData.credits[0]) + Number(subjectData.credits[1]);
                    metrics[requirementTypes["Matérias"]] += 1;
                // }
            }
        });
    }

    // Process subgroups recursively
    if (groupData.subgroups) {
        groupData.subgroups.forEach(subgroup => {
            // Calculate metrics for subgroup
            const subMetrics = calculateRequirements(subgroup, plansSet, subjectDataMap);
            const subCompleted = isComplete(subgroup, subMetrics);

            // Update mandatory status based on subgroup completion
            // if (subgroup.mandatory) {
            //    metrics.mandatoryMet = metrics.mandatoryMet && subCompleted;
            // }
            
            // Only count non-mandatory completed subgroups as blocks
            if (subCompleted) {
                metrics[requirementTypes["Blocos"]] += 1;
            }

            // Add metrics from non-mandatory subgroups to total
            // if (!subgroup.mandatory) {
                metrics[requirementTypes["Créditos"]] += subMetrics[requirementTypes["Créditos"]];
                metrics[requirementTypes["Matérias"]] += subMetrics[requirementTypes["Matérias"]];
            //}
        });
    }

    return metrics;
}

/**
 * Checks if a group meets all its completion requirements
 * @param {Object} groupData - The group data containing completion requirements
 * @param {Object} metrics - The calculated metrics for the group
 * @returns {boolean} True if all requirements are met
 */
function isComplete(groupData, metrics) {
    // Early return if no requirements defined
    if (!groupData.completionRequirements) {
        return false;
    }
    
    // First check if all mandatory items are completed
    if (!metrics.mandatoryMet) {
        return false;
    }
    
    // Then verify all numerical requirements are met
    return groupData.completionRequirements.every(req => {
        switch (req.type) {
            case "Créditos": return metrics[requirementTypes[req.type]] >= req.value;
            case "Matérias": return metrics[requirementTypes[req.type]] >= req.value;
            case "Blocos": return metrics[requirementTypes[req.type]] >= req.value;
            default: return false;
        }
    });
}

/**
 * Memoized version of calculateRequirements for performance
 * Uses group title and selected subjects as cache key
 */
const memoizedCalculateRequirements = memoize(
    (groupData, plansSet, subjectDataMap) => calculateRequirements(groupData, plansSet, subjectDataMap),
    (groupData, plansSet, _) => {
        const selectedSubjects = Array.from(plansSet)
            .filter(subject => groupData.subjects.includes(subject))
            .map(subject => subject.id)
            .join(',');
        return `${groupData.title}-${selectedSubjects}`;
    }
);

export { isComplete, memoizedCalculateRequirements, requirementTypes };