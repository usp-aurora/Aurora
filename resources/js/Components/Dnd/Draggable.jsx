import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';


const Draggable = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform, 
    isDragging
  } = useDraggable({ id: props.id})
  ;
  const style = {
    transform: CSS.Translate.toString(transform),
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    opacity: isDragging ? 0.2 : 1,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}; export default Draggable