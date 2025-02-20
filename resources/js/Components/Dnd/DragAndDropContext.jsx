import { useState, useRef, createContext, useContext } from "react";
import { DndContext, closestCenter, rectIntersection } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";

import DragOverlayComponent from "./DragOverlayComponent.jsx";
import { getContainerName, handleDragStart, handleDragOver, handleDragEnd } from "../../Handlers/DragHandlers.jsx";

const DragAndDropContext = createContext();

/**
 * Determines the best collision detection strategy for draggable items.
 * Uses `rectIntersection` first and falls back to `closestCenter`.
 *
 * @param {Object} params - Drag event parameters.
 * @param {Array} params.droppableContainers - List of available droppable areas.
 * @returns {Array} - Array of detected collisions.
 */
function computeCollision({ droppableContainers, ...args }) {
  const rectCollisions = rectIntersection({ ...args, droppableContainers });

  return rectCollisions.length > 0
    ? rectCollisions
    : closestCenter({ 
        ...args, 
        droppableContainers: droppableContainers.filter(
          (droppable) => getContainerName(droppable) !== "coursePicker"
        ),
      });
}

/**
 * Drag-and-drop provider that manages drag state, interactions, and event handlers.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components wrapped inside the provider.
 * @param {Function} props.setCourseMap - Function to update the course mapping.
 * @param {Function} props.setPlans - Function to update the plan structure.
 */
function DragAndDropProvider({ children, setPlans }) {
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const throttleTimer = useRef(null);

  /**
   * Defines sensors for drag detection.
   * - `PointerSensor`: Detects mouse/touch drag, activated after 5px movement.
   * - `KeyboardSensor`: Enables keyboard-based sorting.
   */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  /**
   * Throttles drag-over event for performance optimization.
   * @param {Object} event - Drag event from DnD Kit.
   */
  function handleThrottledDragOver(event) {
    if (!throttleTimer.current) {
      handleDragOver(event, draggedItem, setPlans);

      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 0.5);
    }
  }

  return (
    <DragAndDropContext.Provider value={{ isDragDisabled, setIsDragDisabled }}>
      <DndContext
        sensors={sensors}
        collisionDetection={computeCollision}
        onDragStart={(e) => handleDragStart(e, setDraggedItem)}
        onDragOver={(e) =>  handleThrottledDragOver(e)}
        onDragCancel={(e) => setDraggedItem(null)}
        onDragEnd={(e) =>  {
          handleDragEnd(e, setPlans); 
          setDraggedItem(null);
        }}
      >
        {draggedItem && <DragOverlayComponent subject={draggedItem} />}
        {children}
      </DndContext>
    </DragAndDropContext.Provider>
  );
}

/**
 * Hook to access the drag-and-drop context.
 * @returns {Object} Drag-and-drop context values.
 */
function useDragAndDrop() {
  return useContext(DragAndDropContext);
}

export { DragAndDropProvider, useDragAndDrop };