import DragOverlayComponent from './DragOverlayComponent.jsx'
import { useState , useRef, useEffect } from 'react'
import { 
  useDndMonitor,
  closestCenter,
  rectIntersection
} from '@dnd-kit/core'
import { 
  handleDragStart,
  handleDragOver,
  handleDragEnd
} from '../../Handlers/DragHandlers.jsx'

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

function Monitor ({ courseMap, setCourseMap, setPlans, setUnsavedChanges }) {
  const [overlayObject, setOverlayObject] = useState(null)
  const [dragObject, setDragObject] = useState(null)
  const throttleTimeout = useRef(null)

  function throttledHandleDragOver(event) {
    if (!throttleTimeout.current) {
      handleDragOver(event, courseMap, setPlans, dragObject, setDragObject)
      
      throttleTimeout.current = setTimeout(() => {
        throttleTimeout.current = null
      }, 1)
    }
  }

  useEffect(() => {
    if (dragObject)
      setCourseMap((prevMap) => {
        const updatedMap = new Map(prevMap)
        updatedMap.set(dragObject.id, {
          ...prevMap.get(dragObject.id),
          semester: dragObject.container === "coursePicker" ? null : Number(dragObject.container.split(" ")[1]),
        })
        return updatedMap
  })}, [dragObject])

  useDndMonitor({
    onDragStart: (event) => handleDragStart(event, courseMap, setOverlayObject, setDragObject),
    onDragOver:  (event) => throttledHandleDragOver(event),
    onDragEnd:   (event) => { 
      handleDragEnd(event, courseMap, dragObject, setPlans)
      setDragObject(null)
      setOverlayObject(null)
      setUnsavedChanges(true)
    },
  })

  return overlayObject ? <DragOverlayComponent course={overlayObject} /> : null
}

export {collisionAlgorithm, Monitor}