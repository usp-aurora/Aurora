import { useState } from "react";

/**
 * Custom hook to initialize and manage the course map state.
 *
 * @param {Array} subjects - List of subjects with their details.
 * @param {Array} categories - List of categories containing courses.
 * @returns {[Map, Function]} - courseMap state and its setter function.
 */
function useCourseMap(subjects, categories) {
  const [courseMap, setCourseMap] = useState(() => {
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
          map.set(course.id, {
            ...map.get(course.id),
            tags: [
              ...map.get(course.id).tags,
              { name: category.name, color: category.color },
            ],
          });
        }
      });
    });

    return map;
  });

  return [courseMap, setCourseMap];
};

export default useCourseMap;