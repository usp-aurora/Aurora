import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import Card from "../Atoms/Card";
import CardContentCourse from "../Atoms/CardContentCourse";
import { useDragAndDrop } from "./DragAndDropProvider";
import GuestWarning from "../Header/TopBar/UserNav/GuestWarning"; // Import as a component

function SortableCard({ id, course, container, disabled, handleClick }) {
    const { isDragDisabled } = useDragAndDrop();
    const [showWarning, setShowWarning] = useState(false);

    const isBlocked = course.semester !== null && !container.startsWith("Semester");
    const isDraggable = !isDragDisabled && !isBlocked && !disabled;
    const sortableId = isDraggable ? course.code : `${course.code}@${container}`;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: sortableId,
        data: {
            course,
            container: container.startsWith("Semester") ? container : "coursePicker",
        },
    });

    const getCardStyle = () => ({
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 0.3s ease, opacity 0.3s ease",
        opacity: isDragging || isBlocked || disabled ? 0.2 : 1,
        touchAction: "none",
        tabIndex: 0,
    });

    return (
        <>
            {showWarning && <GuestWarning onClose={() => setShowWarning(false)} />} {/* Render warning if triggered */}
            <div
                ref={isDraggable ? setNodeRef : undefined}
                onDragStart={() => isDragDisabled && setShowWarning(true)} // Set state instead of calling GuestWarning()
                style={getCardStyle()}
                {...(isDraggable ? { ...attributes, ...listeners } : {})}
            >
                <Card colors={course?.colors} onClick={() => handleClick?.(course)}>
                    <CardContentCourse 
                        pokeball={course?.pokeball} 
                        courseCode={course?.code} 
                        courseTitle={course?.title} 
                        pokemonURL="/pokemons/ditto.png"
                    />
                </Card>
            </div>
        </>
    );
}

export default SortableCard;
