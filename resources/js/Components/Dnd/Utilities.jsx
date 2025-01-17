import { useState } from 'react';
import { useDndMonitor, closestCenter, pointerWithin } from '@dnd-kit/core';
import { handleDragStart, handleDragOver, handleDragEnd } from '../../Handlers/DragHandlers.jsx';
import DragOverlayComponent from './DragOverlayComponent.jsx';

export const collisionAlgorithm = ({ droppableContainers, ...args}) => {
  const pointerCollisions = pointerWithin({
    ...args,
    droppableContainers: droppableContainers
  });
  
  // Collision detection algorithms return an array of collisions
  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }
  
  // Compute other collisions
  return closestCenter({
    ...args,
    droppableContainers: droppableContainers.filter(({id}) => id !== 'coursePicker')
  });
};

export const Monitor = ({ courseMap, setCourseMap, plans, setPlans }) => {
  const [overlayObject, setOverlayObject] = useState(null);
  const [dragObject, setDragObject] = useState(null);

  useDndMonitor({
    onDragStart: (event) => handleDragStart(event, courseMap, setOverlayObject, setDragObject),
    onDragOver: (event) => handleDragOver(event, courseMap, setPlans, dragObject, setDragObject),
    onDragEnd: (event) =>
      handleDragEnd(event, courseMap, setCourseMap, plans, setPlans, dragObject, setDragObject),
  });

  return overlayObject ? <DragOverlayComponent course={overlayObject} /> : null;
};
