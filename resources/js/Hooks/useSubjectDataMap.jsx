import { useState } from "react";
import { initializeSubjectDataMap } from "../Handlers/SubjectDataHandlers"; 

/**
 * Custom hook to initialize and manage the subject data map state.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} course - Course description, containing list of subjects, groups (with subjects and subgroups), etc. 
 * @returns {[Map, Function]} - The `subjectDataMap` state and its setter function.
 */
function useSubjectDataMap(subjects, course) {
  const [subjectDataMap, setSubjectDataMap] = useState(() => initializeSubjectDataMap(subjects, course));
  
  return [subjectDataMap, setSubjectDataMap];
}

export default useSubjectDataMap;
