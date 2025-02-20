import { useState } from 'react';
import { useDragAndDrop } from "./DragAndDropContext";
import { getContainerName } from '../../Handlers/DragHandlers';
import { useDroppable,  useDndMonitor } from '@dnd-kit/core';

function Droppable ({ id, children, placeholder, disabled = false, ...props }) {
  const { isDragDisabled } = useDragAndDrop();

  const { setNodeRef } = useDroppable({ id });
  const [isOver, setIsOver] = useState(false);

  useDndMonitor({
    onDragOver: (event) => setIsOver(getContainerName(event.over) === id),
    onDragEnd: () => setIsOver(false),
    onDragCancel: () => setIsOver(false),
  });

  return (
    <div ref={disabled ? undefined : setNodeRef} {...props}>
      {children}
      {!isOver && !isDragDisabled && placeholder}
    </div>
  );
};

export default Droppable;
