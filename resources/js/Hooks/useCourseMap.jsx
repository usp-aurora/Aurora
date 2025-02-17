import { useState } from "react";

/**
 * Initializes the course map with subjects and their associated categories.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} categories - List of categories containing courses.
 * @returns {Map} - A map where the keys are subject IDs and the values contain subject details.
 */
function initializeCourseMap(subjects, categories) {
  const map = new Map(
    subjects.map((subject) => [
      subject.id,
      {
        ...subject,
        tags: [],
        plan: null,
        semester: null,
        unsaved: false,
        colors: {
          background: "#FFFFFF",
          innerLine: "#51A1E0",
          outerLine: "#17538D",
        },
        pokeball: "#C2DCF5",
      },
    ])
  );

  categories.forEach((category) => {
    category.courses.forEach((course) => {
      if (map.has(course.id)) {
        const existingCourse = map.get(course.id);
        map.set(course.id, {
          ...existingCourse,
          tags: [...existingCourse.tags, { name: category.name, color: category.color }],
        });
      }
    });
  });

  return map;
}

/**
 * Custom hook to initialize and manage the course map state.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} categories - List of categories containing courses.
 * @returns {[Map, Function]} - The `courseMap` state and its setter function.
 */
function useCourseMap(subjects, categories) {
  const [courseMap, setCourseMap] = useState(() => initializeCourseMap(subjects, categories));

  return [courseMap, setCourseMap];
}

export default useCourseMap;