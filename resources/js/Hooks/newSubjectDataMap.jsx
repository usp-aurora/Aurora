import { useState, useMemo } from "react";

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
    const existingEntry = subjectDataMap.get(subjectCode) || NEW_ENTRY;

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
        const existingEntry = updatedMap.get(subjectCode) || NEW_ENTRY;

        updatedMap.set(subjectCode, {
          ...existingEntry,
          ...updates,
        });
      });
      return updatedMap;
    });
  }

  return [subjectDataMap, plannedSubjects, updateSubject, bulkUpdateSubjects];
}

export default useSubjectDataMap;
