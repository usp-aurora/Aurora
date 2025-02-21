import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDragAndDrop } from "./DragAndDropContext";
import WarningDialog from "./WarningDialog";

function SortableItem({ id, subjectData, containerName, children, disabled = false }) {
    const { isDragDisabled } = useDragAndDrop();
    const [showWarning, setShowWarning] = useState(false);

    const isDraggable = !isDragDisabled && !disabled;
    const sortableId = isDraggable ? id : `${id}@${containerName}`;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: sortableId,
        data: {
            subject: { ...subjectData },
            container: typeof containerName === "number" ? containerName : "coursePicker",
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
        touchAction: "none",
        tabIndex: isDraggable ? 0 : -1,
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
