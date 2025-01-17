import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props) => {

    const disabled = props.disable || props.status;
    const sortableId =  disabled? props.key : props.id;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: sortableId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 0.3s ease, opacity 0.3s ease',
        opacity: isDragging || disabled ? 0.2 : 1,
    };

    return (
        <div ref={disabled? null : setNodeRef} style={style} {...attributes} {...listeners}>
          {props.children}
        </div>
    );
}; export default SortableItem;