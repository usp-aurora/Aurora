import { useState, useCallback, createContext, useContext } from "react";
import { DndContext, closestCenter, rectIntersection } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";

import WarningDialog from "./WarningDialog.jsx";
import SubjectOverlay from "./SubjectOverlay.jsx";
import { getContainerName, handleDragStart, handleDragOver } from "../../Handlers/DragHandlers.jsx";
import { usePlansContext } from "../../Hooks/usePlansContext.jsx";

const DragAndDropContext = createContext();

/**
 * Determines the best collision detection strategy for draggable items.
 * - Uses `rectIntersection` first.
 * - Falls back to `closestCenter` but ignores `subjectPicker` as a valid drop area.
 *
 * @param {Object} params - Drag event parameters.
 * @returns {Array} - List of detected collisions.
 */
function determineCollisionStrategy({ droppableContainers, ...props }) {
	const intersectingAreas = rectIntersection({ ...props, droppableContainers });

	return intersectingAreas.length > 0
		? intersectingAreas
		: closestCenter({
			...props,
			droppableContainers: droppableContainers.filter(
				(droppable) => getContainerName(droppable) !== "subjectPicker"
			)
		});
}

/**
 * Drag-and-drop provider that manages drag state, interactions, and event handlers.
 *
 * @param {React.ReactNode} children - Components wrapped inside the provider.
 * @param {boolean} disabled - Disables drag-and-drop functionality.
 */
function DragAndDropProvider({ children, disabled = false }) {
	const [draggedItem, setDraggedItem] = useState(null);
	const [showWarning, setShowWarning] = useState(false);
	const { restoreCurrentPlans, updatePlans } = usePlansContext();

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
	 * Prevents drag actions when the feature is disabled.
	 * Displays a warning if the user attempts to drag.
	 *
	 * @param {Object} event - Drag event from DnD Kit.
	 */
    const preventDragIfDisabled = useCallback((event) => {
        if (event.type === "ondragstart") event.preventDefault();
        else if (event.type === "ontouchmove") event.stopPropagation();

        if (!disabled) return;
        setShowWarning(true);
    }, [disabled]);

	return (
		<DragAndDropContext.Provider value={{ dndDisabled: disabled, overContainer: draggedItem?.container, preventDragIfDisabled }}>
			<DndContext
				sensors={sensors}
				collisionDetection={determineCollisionStrategy}
				onDragStart={(e) => handleDragStart(e, setDraggedItem)}
				onDragOver={(e) => handleDragOver(e, draggedItem, setDraggedItem, updatePlans)}
				onDragEnd={() => {handleDragEnd(event, commitPlans); setDraggedItem(null);}}
				onDragCancel={() => {
					restoreCurrentPlans();
					setDraggedItem(null);
				}}
			>
				{/* Display warning dialog if drag is disabled */}
				<WarningDialog open={showWarning} onClose={() => setShowWarning(false)} />
				{console.log("draggedItem: ", draggedItem)}
				{/* Render drag overlay if an item is currently being dragged */}
				{draggedItem && <SubjectOverlay subject={draggedItem} />}

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