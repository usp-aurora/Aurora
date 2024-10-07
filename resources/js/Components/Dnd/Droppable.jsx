import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Droppable = (props) => {
  const {setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <div ref={props.disable ? null : setNodeRef} style={{minHeight: props.children.offsetHeight}}>     
      {props.children}
    </div>
  );

}; export default Droppable;