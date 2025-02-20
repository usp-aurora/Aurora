/**
 * Initializes the subject data map with subjects and their associated tags.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} course - Course description, containing list of groups with subjects and subgroups.
 * @returns {Map} - A map where the keys are subject IDs and the values contain subject details.
 */
function initializeSubjectDataMap(subjects, course) {
  const map = new Map(
    subjects.map((subject) => [
      subject.code,
      {
        ...subject,
        tags: [],
        plan: null,
        semester: null,
        unsaved: false,
      },
    ])
  );

  /**
   * Recursively processes groups and subgroups, adding the parent group as a tag.
   *
   * @param {Object} group - The group/subgroup object.
   * @param {string} parentGroup - The name of the parent group.
   */
  function processGroup(group, parentGroup) {
    group.subjects.forEach((subject) => {
      if (map.has(subject.code)) {
        const existingEntry = map.get(subject.code);

        // Define the tag using the parent group
        const newTag = { name: parentGroup };

        // Ensure tags are unique and avoid duplicates
        const updatedTags = existingEntry.tags.some(tag => tag.name === newTag.name)
          ? existingEntry.tags
          : [...existingEntry.tags, newTag];

        map.set(subject.code, {
          ...existingEntry,
          tags: updatedTags,
        });
      }
    });

    // Recursively process subgroups
    group.subgroups.forEach((subgroup) => {
      processGroup(subgroup, parentGroup);
    });
  }

  // Start processing from the root groups
  course.subgroups.forEach((group) => {
    processGroup(group, group.title);
  });

  return map;
}

/**
 * Merges retrieved plan data into the existing subject data map.
 *
 * @param {Map} currentSubjectDataMap - The existing subject data map.
 * @param {Array} retrievedPlans - Plans data to merge.
 * @returns {Map} - The updated subject data map.
 */
function mergePlansIntoSubjectDataMap(currentSubjectDataMap, retrievedPlans) {
  const updatedSubjectDataMap = new Map(currentSubjectDataMap);

  retrievedPlans.forEach((semester) => {
    semester.subjects.forEach((subject) => {
      if (updatedSubjectDataMap.has(subject.code)) {
        updatedSubjectDataMap.set(subject.code, {
          ...updatedSubjectDataMap.get(subject.code),
          plan: subject.plan,
          semester: semester.semesterId,
        });
      }
    });
  });

  return updatedSubjectDataMap;
}

export { initializeSubjectDataMap, mergePlansIntoSubjectDataMap};