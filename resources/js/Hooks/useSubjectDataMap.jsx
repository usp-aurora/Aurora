import { useState } from "react";

/**
 * Initializes the subject data map with subjects and their associated tags.
 *
 * @param {Array} course - Course description, containing list of groups with subjects and subgroups.
 * @returns {Map} - A map where the keys are subject IDs and the values contain subject details.
 */
function initializeSubjectDataMap(course) {
  const map = new Map();

  // Initialize map with subjects
  course.subjects.forEach((subject) => {
    map.set(subject.code, {
      tags: [],
      plan: null,
      semester: null,
      unsaved: false,
    });
  });

  /**
   * Recursively processes groups and subgroups, adding the parent group as a tag.
   *
   * @param {Object} group - The group/subgroup object.
   * @param {string} parentGroup - The name of the parent group.
   */
  function processGroup(group, parentGroup) {
    group.subjects.forEach((subject) => {
      const existingEntry = map.get(subject.code) || {
        tags: [],
        plan: null,
        semester: null,
        unsaved: false,
      };

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
 * Custom hook to initialize and manage the subject data map state.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} course - Course description, containing list of subjects, groups (with subjects and subgroups), etc.
 * @returns {[Map, Function, Function]} - The `subjectDataMap` state, the single update function, and the bulk update function.
 */
function useSubjectDataMap(course) {
  const [subjectDataMap, setSubjectDataMap] = useState(() => initializeSubjectDataMap(course));

  /**
   * Updates attributes of a subject in the subjectDataMap.
   * Marks the subject as unsaved.
   *
   * @param {string} subjectCode - The code of the subject being updated.
   * @param {Object} updates - An object containing the attributes to update.
   * @returns {Object} - Action details including subject key and the previous values of updated attributes.
   */
  function updateSubject(subjectCode, updates) {
    const existingEntry = subjectDataMap.get(subjectCode) || {
      tags: [],
      plan: null,
      semester: null,
      unsaved: false,
    };

    const action = {
      key: subjectCode,
      changes: Object.keys(updates).reduce((acc, key) => {
        acc[key] = { from: existingEntry[key], to: updates[key] };
        return acc;
      }, {}),
    };

    setSubjectDataMap((prevMap) => {
      const updatedMap = new Map(prevMap);
      updatedMap.set(subjectCode, {
        ...existingEntry,
        ...updates,
        unsaved: true,
      });
      return updatedMap;
    });

    return action;
  }

  /**
   * Updates attributes of multiple subjects in the subject data map.
   *
   * @param {Array} updatesList - List of updates to apply, each containing:
   *   - `subjectCode` (string): The subject code.
   *   - `updates` (object): An object with attributes to update.
   */
  function bulkUpdateSubjects(updatesList) {
    setSubjectDataMap((prevMap) => {
      const updatedMap = new Map(prevMap);

      updatesList.forEach(({ subjectCode, updates }) => {
        if (updatedMap.has(subjectCode)) {
          const existingEntry = updatedMap.get(subjectCode);
          updatedMap.set(subjectCode, {
            ...existingEntry,
            ...updates,
          });
        }
      });

      return updatedMap;
    });
  }

  return [subjectDataMap, updateSubject, bulkUpdateSubjects];
}

export default useSubjectDataMap;
