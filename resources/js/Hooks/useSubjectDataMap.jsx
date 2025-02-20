import { useState } from "react";
import { initializeSubjectDataMap } from "../Handlers/SubjectDataHandlers";

/**
 * Custom hook to initialize and manage the subject data map state.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} course - Course description, containing list of subjects, groups (with subjects and subgroups), etc.
 * @returns {[Map, Function, Function]} - The `subjectDataMap` state, its setter function, and the update function.
 */
function useSubjectDataMap(subjects, course) {
  const [subjectDataMap, setSubjectDataMap] = useState(() => initializeSubjectDataMap(subjects, course));

   /**
   * Updates the semester of a subject in the subjectDataMap.
   * Marks the subject as unsaved.
   *
   * @param {string} subjectCode - The code of the subject being updated.
   * @param {number | null} newSemester - The semester where the subject is placed.
   * @returns {Object} - Action details including subject key and semester change.
   */
   function updateSubjectSemester(subjectCode, newSemester) {
    const existingEntry = subjectDataMap.get(subjectCode);
    const action = {
      key: subjectCode,
      from: existingEntry ? existingEntry.semester : null,
      to: newSemester,
    };
    
    setSubjectDataMap(prevMap => {
      const updatedMap = new Map(prevMap);
      updatedMap.set(subjectCode, {
        ...existingEntry,
        semester: newSemester,
        unsaved: true,
      });
      return updatedMap;
    });
    return action;
  }

  return [subjectDataMap, setSubjectDataMap, updateSubjectSemester];
}

export default useSubjectDataMap;
