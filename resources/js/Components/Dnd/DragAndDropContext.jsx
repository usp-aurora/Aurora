import { useState, useRef, useEffect, createContext, useContext } from "react";
import { DndContext, closestCenter, rectIntersection } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { getContainerName, handleDragStart, handleDragOver, handleDragEnd } from "../../Handlers/DragHandlers.jsx";
import DragOverlayComponent from "./DragOverlayComponent.jsx";

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
          (droppable) => getContainerName(droppable) !== "coursePicker"
        ),
      });
}

/**
 * Drag-and-drop provider that manages drag state, interactions, and event handlers.
 *
 * @param {React.ReactNode} children - Components wrapped inside the provider.
 * @param {Function} setCourseMap - Function to update the course mapping.
 * @param {Function} setPlans - Function to update the plan structure.
 */
function DragAndDropProvider({ children, setCourseMap, setPlans }) {
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const [dragOverlay, setDragOverlay] = useState(null);
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
      handleDragOver(event, setPlans, draggedItem, setDraggedItem);

      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null;
      }, 0.5);
    }
  }

  /**
   * Updates `courseMap` when an item is dragged.
   * Marks changes as unsaved.
   */
  useEffect(() => {
    if (draggedItem) {
      setCourseMap((prevMap) => {
        const updatedMap = new Map(prevMap);
        updatedMap.set(draggedItem.id, {
          ...prevMap.get(draggedItem.id),
          semester: draggedItem.container === "coursePicker" ? null : Number(draggedItem.container),
          unsaved: true,
        });
        return updatedMap;
      });
    }
  }, [draggedItem, setCourseMap]);

  return (
    <DragAndDropContext.Provider value={{ isDragDisabled, setIsDragDisabled }}>
      <DndContext
        sensors={sensors}
        collisionDetection={computeCollision}
        onDragStart={(event) => handleDragStart(event, setDragOverlay, setDraggedItem)}
        onDragOver={handleThrottledDragOver}
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
        {dragOverlay && <DragOverlayComponent subject={dragOverlay} />}
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