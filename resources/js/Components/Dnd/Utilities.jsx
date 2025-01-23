import DragOverlayComponent from './DragOverlayComponent.jsx'
import { useState , useRef, useEffect } from 'react'
import { useDndMonitor, closestCenter, rectIntersection } from '@dnd-kit/core'
import { 
  handleDragStart,
  handleDragOver,
  handleDragEnd
} from '../../Handlers/DragHandlers.jsx'

/**
 * Collision detection algorithm for drag-and-drop operations.
 * Combines `rectIntersection` and `closestCenter` to calculate the most relevant drop targets.
 * 
 * @param {Object} params - Parameters for collision detection.
 * @param {Array} params.droppableContainers - List of droppable containers.
 * @returns {Array} Collision results.
 */
function computeCollision({ droppableContainers, ...args }) {
  const rectCollisions = rectIntersection({
    ...args,
    droppableContainers,
  })

  if (rectCollisions.length > 0) {
    return rectCollisions
  }

  return closestCenter({
    ...args,
    droppableContainers: droppableContainers.filter(({ id }) => id !== 'coursePicker'),
  })
}

/**
 * Monitors drag-and-drop events and manages related state updates.
 * 
 * @param {Map} props.courseMap - Map of course data.
 * @param {Function} props.setCourseMap - Setter for updating the course map.
 * @param {Function} props.setPlans - Setter for updating plans.
 * @param {Function} props.setUnsavedChanges - Setter for tracking unsaved changes.
 * @returns {JSX.Element|null} Drag overlay component if dragging, otherwise null.
 */
function DragMonitor({ courseMap, setCourseMap, setPlans, setUnsavedChanges }) {
  const [dragOverlay, setDragOverlay] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)
  const throttleTimer = useRef(null);

  /**
   * Handles the `onDragOver` event with throttling to prevent frequent updates.
   * 
   * @param {Object} event - Drag event from DnD Kit.
   */
  function handleThrottledDragOver(event) {
    if (!throttleTimer.current) {
      handleDragOver(event, courseMap, setPlans, draggedItem, setDraggedItem)

      throttleTimer.current = setTimeout(() => {
        throttleTimer.current = null
      }, 1) // Throttle duration in milliseconds.
    }
  }

  /**
   * Updates the course map when the dragged item's position changes.
   */
  useEffect(() => {
    if (draggedItem) {
      setCourseMap((prevMap) => {
        const updatedMap = new Map(prevMap)
        updatedMap.set(draggedItem.id, {
          ...prevMap.get(draggedItem.id),
          semester: draggedItem.container === 'coursePicker' ? null : Number(draggedItem.container.split(' ')[1]),
        })
        return updatedMap
      })
    }
  }, [draggedItem])

  /**
   * Monitors drag-and-drop events and delegates handling to relevant functions.
   */
  useDndMonitor({
    onDragStart: (event) => handleDragStart(event, courseMap, setDragOverlay, setDraggedItem),
    onDragOver: (event) => handleThrottledDragOver(event),
    onDragEnd: (event) => {
      handleDragEnd(event, courseMap, draggedItem, setPlans)
      setDraggedItem(null)
      setDragOverlay(null)
      setUnsavedChanges(true)
    },
  })

  return dragOverlay ? <DragOverlayComponent course={dragOverlay} /> : null
}

export {computeCollision, DragMonitor}