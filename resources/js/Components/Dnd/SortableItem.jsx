import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDragAndDrop } from "./DragAndDropContext";

import WarningDialog from "./WarningDialog";

function SortableItem({ id, subjectData, container, children, disabled = false }) {
    const { isDragDisabled } = useDragAndDrop();
    const [showWarning, setShowWarning] = useState(false);

    const isDraggable = !isDragDisabled && !disabled;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: id,
        data: {
            subject: subjectData,
            container: container,
        },
    });

    function handleDragStart(event) {
        event.preventDefault(); // prevent native drag behavior
        if (isDragDisabled) setShowWarning(true);
    };

    const cardStyle = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "opacity 0.3s ease",
        opacity: isDragging ? 0.2 : 1,
        tabIndex: isDraggable ? 0 : -1,
        touchAction: "none",
    };

    return (
        <>
            <WarningDialog open={showWarning} onClose={() => setShowWarning(false)} />
            <div
                ref={isDraggable ? setNodeRef : undefined}
                style={cardStyle}
                draggable="true"
                onDragStart={handleDragStart}
                onTouchMove={() => isDragDisabled && setShowWarning(true)}
                {...(isDraggable ? { ...attributes, ...listeners } : {})}
            >   
                {children}
            </div>
        </>
    );
}

export default SortableItem;
