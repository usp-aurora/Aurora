import { useState, useMemo } from "react";

/**
 * Initializes the subject data map with subjects and their associated tags.
 *
 * @param {Array} course - Course description, containing list of groups with subjects and subgroups.
 * @returns {Map} - A map where the keys are subject IDs and the values contain subject details.
 */
function initializeSubjectDataMap(course) {
  const map = new Map();

  // Populate the map with subjects, initializing metadata
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
 * Custom hook for managing subject metadata within a course.
 *
 * @param {Object} course - Course data containing subjects, groups, and subgroups.
 * @returns {[Map, Set, Function, Function]} - Returns:
 *   - `subjectDataMap` (Map): The stateful map storing subject metadata.
 *   - `plannedSubjects` (Set): A set containing subject codes of planned subjects (subjects with assigned semesters).
 *   - `updateSubject` (Function): Function to update a specific subject.
 *   - `bulkUpdateSubjects` (Function): Function to update multiple subjects at once.
 */
function useSubjectDataMap(course) {
  const [subjectDataMap, setSubjectDataMap] = useState(() => initializeSubjectDataMap(course));

  /**
   * Retrieves a set of subject codes where the subject is assigned to a semester.
   * 
   * @returns {Set<string>} - A set of subject codes with a non-null semester.
   */
  const plannedSubjects = useMemo(() => 
    new Set([...subjectDataMap]
        .filter(([, info]) => info.semester !== null)
        .map(([subjectCode]) => subjectCode)
  ), [subjectDataMap]);


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
        const existingEntry = updatedMap.get(subjectCode) || {
          tags: [],
          plan: null,
          semester: null,
          unsaved: false,
        };

        updatedMap.set(subjectCode, {
          ...existingEntry,
          ...updates,
        });
      });
      console.log(updatedMap);
      return updatedMap;
    });
  }

  return [subjectDataMap, plannedSubjects, updateSubject, bulkUpdateSubjects];
}

export default useSubjectDataMap;
