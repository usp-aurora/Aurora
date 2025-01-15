import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Droppable = (props) => {
  const {setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <div ref={props.disable? undefined : setNodeRef} style={{minHeight: props.children.offsetHeight, minWidth: props.children.offsetWidth}}>     
      {props.children}
    </div>
  );

}; export default Droppable;