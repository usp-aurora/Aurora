import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function Droppable ({ id, children, disabled = false, ...props }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={disabled ? undefined : setNodeRef} {...props}>
      {children}
    </div>
  );
};

export default Droppable;
