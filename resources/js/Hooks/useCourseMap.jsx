import { useState } from "react";

/**
 * Initializes the course map with subjects and their associated categories.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} categories - List of categories containing courses.
 * @returns {Map} - A map where the keys are subject IDs and the values contain subject details.
 */
function initializeCourseMap(subjects) {
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
  return map;
}

/**
 * Custom hook to initialize and manage the course map state.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} categories - List of categories containing courses.
 * @returns {[Map, Function]} - The `courseMap` state and its setter function.
 */
function useCourseMap(subjects) {
  const [courseMap, setCourseMap] = useState(() => initializeCourseMap(subjects));

  return [courseMap, setCourseMap];
}

export default useCourseMap;