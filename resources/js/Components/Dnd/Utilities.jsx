import DragOverlayComponent from './DragOverlayComponent.jsx';
import { useState , useRef } from 'react';
import { 
  useDndMonitor,
  closestCenter,
  rectIntersection
} from '@dnd-kit/core';
import { 
  handleDragStart,
  handleDragOver,
  handleDragEnd
} from '../../Handlers/DragHandlers.jsx';

function collisionAlgorithm({ droppableContainers, ...args}) {
  const rectIntersectionCollisions = rectIntersection({
    ...args,
    droppableContainers: droppableContainers
  })
  
  // Collision detection algorithms return an array of collisions
  if (rectIntersectionCollisions.length > 0)
    return rectIntersectionCollisions

  // Compute other collisions
  return closestCenter({
    ...args,
    droppableContainers: droppableContainers.filter(({id}) => id !== 'coursePicker')
  })
}

function Monitor ({ courseMap, setCourseMap, plans, setPlans }) {
  const [overlayObject, setOverlayObject] = useState(null)
  const [dragObject, setDragObject] = useState(null)
  const throttleTimeout = useRef(null);

  function throttledHandleDragOver(event) {
    if (!throttleTimeout.current) {
      handleDragOver(event, courseMap, setPlans, dragObject, setDragObject);
      
      throttleTimeout.current = setTimeout(() => {
        throttleTimeout.current = null;
      }, 1);
    }
  };

  useDndMonitor({
    onDragStart: (event) => handleDragStart(event, courseMap, setOverlayObject, setDragObject),
    onDragOver:  (event) => throttledHandleDragOver(event),
    onDragEnd:   (event) => handleDragEnd(event, courseMap, setCourseMap, plans, setPlans, dragObject, setDragObject),
  })

  return overlayObject ? <DragOverlayComponent course={overlayObject} /> : null
}

export {collisionAlgorithm, Monitor}