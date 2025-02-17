import { useState, useRef, useEffect, createContext, useContext } from "react";
import { DndContext, closestCenter, rectIntersection } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { getContainerName, handleDragStart, handleDragOver, handleDragEnd } from "../../Handlers/DragHandlers.jsx";
import DragOverlayComponent from "./DragOverlayComponent.jsx";

const DragAndDropContext = createContext();

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
        droppableContainers: droppableContainers.filter((droppable) => getContainerName(droppable) !== "coursePicker" ) 
      });
}

/**
 * Provides a Drag-and-Drop context, managing drag states and event handlers.
 *
 * @param {Object} props - Props passed to the provider.
 * @param {React.ReactNode} props.children - Child components wrapped by the provider.
 * @param {Function} props.setCourseMap - Function to update course mapping.
 * @param {Function} props.setPlans - Function to update plan structure.
 */
function DragAndDropProvider({ children, setCourseMap, setPlans }) {
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const [dragOverlay, setDragOverlay] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const throttleTimer = useRef(null);

  /**
   * Defines the sensors used for detecting drag interactions.
   * - `PointerSensor`: Detects dragging with mouse/touch, activated after moving 5px.
   * - `KeyboardSensor`: Allows keyboard-based sorting.
   */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Ensures small movements as clicks
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
      }, 5) // Throttle duration in milliseconds.
    }
  }

  /**
   * Updates `courseMap` when dragged item changes.
   * Marks changes as unsaved.
   */
  useEffect(() => {
    if (draggedItem) {
      setCourseMap((prevMap) => {
        const updatedMap = new Map(prevMap);
        updatedMap.set(draggedItem.course.id, {
          ...prevMap.get(draggedItem.course.id),
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
			onDragOver={(event) => handleThrottledDragOver(event)}
			onDragEnd={(event) => { 
				handleDragEnd(event, draggedItem, setPlans);
				setDraggedItem(null);
				setDragOverlay(null);
			}}
			onDragCancel={() => {setDraggedItem(null); setDragOverlay(null); }}    
		>
			{dragOverlay && <DragOverlayComponent course={dragOverlay} />}
			{children}
		</DndContext>
	</ DragAndDropContext.Provider>
  );
}

/**
 * Hook to access the drag-and-drop context.
 * @returns {Object} Drag-and-drop context.
 */
function useDragAndDrop() { return useContext(DragAndDropContext); }

export { DragAndDropProvider, useDragAndDrop };