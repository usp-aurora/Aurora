import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Droppable = ({id, children, enabled = true}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  
  return (
    <div ref={enabled? setNodeRef : null} style={{minHeight: children.offsetHeight}}>     
      {children}
    </div>
  );

}; export default Droppable;