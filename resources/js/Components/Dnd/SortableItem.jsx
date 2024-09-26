import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        opacity: isDragging ? 0.2 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          {props.children}
        </div>
    );
}; export default SortableItem;