import { DndContext, closestCenter, rectIntersection } from "@dnd-kit/core";
import { useState, useRef, useEffect } from "react";
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { handleDragStart, handleDragOver, handleDragEnd } from "../../Handlers/DragHandlers.jsx";
import DragOverlayComponent from "./DragOverlayComponent.jsx";

/**
 * Computes the best collision detection strategy for draggable items.
 * Prioritizes `rectIntersection` but falls back to `closestCenter`.
 *
 * @param {Object} params - Drag event parameters.
 * @param {Array} params.droppableContainers - List of droppable targets.
 * @returns {Array} - Array of collision detections.
 */
function computeCollision({ droppableContainers, ...args }) {
  const rectCollisions = rectIntersection({ ...args, droppableContainers });

  return rectCollisions.length > 0
    ? rectCollisions
    : closestCenter({ 
        ...args, 
        droppableContainers: droppableContainers.filter(({ id }) => id !== "coursePicker") 
      });
}

/**
 * Provides a Drag-and-Drop context, managing drag states and event handlers.
 *
 * @param {Object} props - Props passed to the provider.
 * @param {React.ReactNode} props.children - Child components wrapped by the provider.
 * @param {Function} props.setCourseMap - Function to update course mapping.
 * @param {Function} props.setPlans - Function to update plan structure.
 * @param {Function} props.setUnsavedChanges - Function to mark unsaved changes.
 */
function DragAndDropProvider({ children, setCourseMap, setPlans, setUnsavedChanges }) {
  const [dragOverlay, setDragOverlay] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const throttleTimer = useRef(null);

  /**
   * Defines the sensors used for detecting drag interactions.
   * - `PointerSensor`: Detects dragging with mouse/touch, activated after moving 5px.
   * - `KeyboardSensor`: Allows keyboard-based sorting.
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // Ensures small movements as clicks
    }),
    useSensor(KeyboardSensor)
  );

  /**
   * Throttles drag-over event to improve performance.
   * @param {Object} event - Drag event from DnD Kit.
   */
  function handleThrottledDragOver(event) {
    if (!throttleTimer.current) {
      handleDragOver(event, setPlans, draggedItem, setDraggedItem);

      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 1) // Throttle duration in milliseconds.
    }
  }

  /**
   * Updates `courseMap` when dragged item changes.
   */
  useEffect(() => {
    if (draggedItem) {
      setUnsavedChanges(true);
      setCourseMap((prevMap) => {
        const updatedMap = new Map(prevMap);
        updatedMap.set(draggedItem.id, {
          ...prevMap.get(draggedItem.id),
          semester: draggedItem.container === "coursePicker" ? null : Number(draggedItem.container.split(" ")[1]),
          unsaved: true,
        });
        return updatedMap;
      });
    }
  }, [draggedItem]);

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={computeCollision}
      /**
       * Monitors drag events and updates states accordingly.
       */
      onDragStart={(event) => handleDragStart(event, setDragOverlay, setDraggedItem)}
      onDragOver={(event) => handleThrottledDragOver(event)}
      onDragEnd={(event) => { 
        handleDragEnd(event, draggedItem, setPlans);
        setDraggedItem(null);
        setDragOverlay(null);
      }}
      onDragCancel={() => {
        setDraggedItem(null);
        setDragOverlay(null);
      }}    
    >
      {dragOverlay && <DragOverlayComponent course={dragOverlay} />}
      {children}
    </DndContext>
  );
}

export default DragAndDropProvider;
