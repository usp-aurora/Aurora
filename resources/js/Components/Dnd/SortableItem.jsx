import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useDragAndDrop } from "./DragAndDropProvider";

function SortableItem({ id, courseData, containerName, isDisabled, children }) {
    const { isDragDisabled } = useDragAndDrop();

    const isDraggable = !isDragDisabled && !isDisabled;
    const sortableId = isDraggable ? id : `${id}@${containerName}`;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: sortableId,
        data: {
            course: { ...courseData },
            container: containerName.startsWith("Semester") ? containerName : "coursePicker",
        },
    });

    const cardStyle = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 0.3s ease, opacity 0.3s ease",
        opacity: isDragging || isDisabled ? 0.2 : 1,
        touchAction: "none",
        tabIndex: isDraggable ? 0 : -1,
    };

    return (
        <div
            ref={isDraggable ? setNodeRef : undefined}
            onDrag={() => isDragDisabled && console.log("desativado")}
            style={cardStyle}
            {...(isDraggable ? { ...attributes, ...listeners } : {})}
        >
            {children}
        </div>
    );
}

export default SortableItem;
