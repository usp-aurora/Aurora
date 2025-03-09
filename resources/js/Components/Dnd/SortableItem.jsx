import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDragAndDrop } from "./DragAndDropContext";

function SortableItem({ id, children, itemData, isStatic = false }) {
    const { dndDisabled, preventDragIfDisabled } = useDragAndDrop();
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

    const dndProps = isDraggable ? { ...attributes, ...listeners } : {};

    const draggableProps = isStatic ? {} : {
              draggable: "true",
              onDragStart: (e) => {
                  e.preventDefault();
                  preventDragIfDisabled();
              },
              onTouchMove: (e) => {
                  e.stopPropagation();
                  preventDragIfDisabled();
              },
          };

    return (
        <div ref={isDraggable ? setNodeRef : undefined} style={cardStyle} {...dndProps} {...draggableProps}>
            {children}
        </div>
    );
}

export default SortableItem;
