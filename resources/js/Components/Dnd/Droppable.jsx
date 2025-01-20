import React from 'react'
import {useDroppable} from '@dnd-kit/core'

function Droppable({id, disable = false, ...props}) {
  const {setNodeRef} = useDroppable({
    id: id,
  })
  
  return (
    <div ref={disable? undefined : setNodeRef} style={{minHeight: props.children.clientHeight, minWidth: props.children.clientWidth}}>     
      {props.children}
    </div>
  )

}

export default Droppable