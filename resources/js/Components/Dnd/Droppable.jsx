import { useState } from 'react';
import { getContainerName } from '../../Handlers/DragHandlers';
import { useDroppable,  useDndMonitor } from '@dnd-kit/core';

function Droppable ({ id, children, placeholder, disabled = false, ...props }) {
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
      {!isOver && !disabled && placeholder}
    </div>
  );
};

export default Droppable;
