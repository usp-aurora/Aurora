import { useDroppable } from '@dnd-kit/core';
import { useDragAndDrop } from './DragAndDropContext';

function Droppable ({ id, children, Placeholder, disabled = false, ...props }) {
  const { overContainer } = useDragAndDrop();
  const { setNodeRef } = useDroppable({ id });

  const isOver = (overContainer === id);

  return (
    <div ref={disabled ? undefined : setNodeRef} {...props}>
      {children}
      {!isOver && !disabled && Placeholder}
    </div>
  );
};

export default Droppable;
