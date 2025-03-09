import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDragAndDrop } from "./DragAndDropContext";

/**
 * Universal drag-and-drop item that supports both draggable and sortable behaviors.
 *
 * @param {string} id - Unique identifier for the item.
 * @param {React.ReactNode} children - The content of the draggable item.
 * @param {Object} itemData - Object containing metadata related to the item, including container info.
 * @param {boolean} disabled - Determines if dragging should be disabled.
 */
function SortableItem({ id, children, itemData, isStatic = false }) {
    const { dndDisabled, preventDragIfDisabled } = useDragAndDrop();

    // Disable dragging if globally disabled or if the specific item is static
    const isDraggable = !(dndDisabled || isStatic);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
        data: itemData,
    });

    const cardStyle = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "opacity 0.3s ease",
        opacity: isDragging ? 0.2 : 1,
        tabIndex: isDraggable ? 0 : -1,
        touchAction: "none",
    };

    return (
        <div
            ref={isDraggable ? setNodeRef : undefined}
            style={cardStyle}
            {...(isDraggable ? { ...attributes, ...listeners } : {})}
            {...(!isStatic ? {draggable: "true", onDragStart: preventDragIfDisabled, onTouchMove: preventDragIfDisabled } : {})}
        >   
            {children}
        </div>
    );
}

export default SortableItem;