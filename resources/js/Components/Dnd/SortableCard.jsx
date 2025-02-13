import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import Card from "../Atoms/Card"
import CardContentCourse from "../Atoms/CardContentCourse"

function SortableCard({ id, course, container, disabled, ...props }) {
    const blocked = (course.semester !== null && !container.startsWith('Semester'));
    const sortableId = (disabled || blocked) ? `${course.code}@${container}` : course.code;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
        id: sortableId,
        data: {
            course: course,
            container: container.startsWith('Semester') ? container : 'coursePicker',
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 0.3s ease, opacity 0.3s ease',
        opacity: isDragging || blocked || disabled ? 0.2 : 1,
        touchAction: "none",
        tabIndex: 0
    }

    return (
        <div ref={!blocked && !disabled ? setNodeRef : undefined} style={style} {...(!blocked && !disabled ? { ...attributes, ...listeners } : {})}>
            <Card colors={course?.colors} onClick={() => props?.handleClick(course)}>
                <CardContentCourse 
                    pokeball={course?.pokeball} 
                    courseCode={course?.code} 
                    courseTitle={course?.title} 
                    pokemonURL="/pokemons/ditto.png"
                />
            </Card>
        </div>
    );
}

export default SortableCard