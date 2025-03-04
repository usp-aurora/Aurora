import { useState, useRef, createContext, useContext, useEffect } from "react";
import { DndContext, closestCenter, rectIntersection } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";

import DragOverlayComponent from "./DragOverlayComponent.jsx";
import { getContainerName, handleDragStart, handleDragOver } from "../../Handlers/DragHandlers.jsx";

const DragAndDropContext = createContext();

/**
 * Determines the best collision detection strategy for draggable items.
 * Uses `rectIntersection` first and falls back to `closestCenter`.
 *
 * @param {Array} droppableContainers - List of available droppable areas.
 * @param {Object} args - Drag event parameters.
 * @returns {Array} - Array of detected collisions.
 */
function computeCollision({ droppableContainers, ...props }) {
  const rectCollisions = rectIntersection({ ...props, droppableContainers });

  return rectCollisions.length > 0
    ? rectCollisions
    : closestCenter({ 
        ...props, 
        droppableContainers: droppableContainers.filter(
          (droppable) => getContainerName(droppable) !== "subjectPicker"
        ),
      });
}

/**
 * Drag-and-drop provider that manages drag state, interactions, and event handlers.
 *
 * @param {React.ReactNode} children - Components wrapped inside the provider.
 * @param {Function} setPlans - Function to set the plan structure.
 */
function DragAndDropProvider({ children, setPlans, resetPlans, disabled = false }) {
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
      handleDragOver(event, draggedItem, setDraggedItem, setPlans);

      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 0.5);
    }
  }

  return (
    <DragAndDropContext.Provider value={{ isDragDisabled: disabled }}>
      <DndContext
        sensors={sensors}
        collisionDetection={computeCollision}
        onDragStart={(e) => handleDragStart(e, setDraggedItem)}
        onDragOver={handleThrottledDragOver}
        onDragEnd={() => setDraggedItem(null)}
        onDragCancel={() => {
          resetPlans();
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