import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import Card from "../Atoms/Card"
import CardContentCourse from "../Atoms/CardContentCourse"

function SortableItem({id, course, container, ...props}) {
    const planed = course.semester !== null
    const disabled = props.disable || (planed && !container.startsWith('Semester'))
    const sortableId =  disabled? `${id}@${container}` : id

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: sortableId })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 0.3s ease, opacity 0.3s ease',
        opacity: isDragging || disabled ? 0.2 : 1,
        touchAction: "none",
        tabindex: 0
    }

    return (
        <div ref={disabled? null : setNodeRef} style={style} {...attributes} {...listeners}>
            <Card colors={course?.colors} onClick={() => props?.handleClick(course)}>
                <CardContentCourse 
                    pokeball={course?.pokeball} 
                    courseCode={course?.code} 
                    courseTitle={course?.title} 
                    pokemonURL="/pokemons/ditto.png"
                />
            </Card>
        </div>
    )
}

export default SortableItem