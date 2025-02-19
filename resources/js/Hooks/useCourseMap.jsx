import { useState } from "react";

/**
 * Initializes the course map with subjects and their associated tags.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} course - Course description, containing list of groups with subjects and subgroups.
 * @returns {Map} - A map where the keys are subject IDs and the values contain subject details.
 */
function initializeCourseMap(subjects, course) {
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
      processGroup(subgroup, parentGroup); // Pass the current category title as the parentGroup
    });
  }

  // Start processing from the root groups
  course.subgroups.forEach((group) => {
    processGroup(group, group.title); // Initial parent group is itself
  });


  console.log(map);
  return map;
}

/**
 * Custom hook to initialize and manage the course map state.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} groups - List of groups containing subjects and subgroups.
 * @returns {[Map, Function]} - The `courseMap` state and its setter function.
 */
function useCourseMap(subjects, groups) {
  const [courseMap, setCourseMap] = useState(() => initializeCourseMap(subjects, groups));

  return [courseMap, setCourseMap];
}

export default useCourseMap;