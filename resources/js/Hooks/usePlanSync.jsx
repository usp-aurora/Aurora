import { useEffect, useRef } from "react"
import { 
    fetchPlansFromServer, 
    syncPlansWithServer 
} from '../Handlers/PlansHandlers.jsx'

/**
 * Custom hook to synchronize course data and fetch plans at regular intervals.
 * 
 * @param {Map} courseMap - Map containing course data.
 * @param {Function} updateCourseMap - Function to update the course map state.
 * @param {Function} updatePlans - Function to set plans state.
 * @param {Function} markUnsavedChanges - Function to set the unsaved changes flag.
 */
function usePlanSync(courseMap, updateCourseMap, updatePlans, markUnsavedChanges) {
  const courseMapRef = useRef(courseMap)

  useEffect(() => {
    courseMapRef.current = courseMap
  }, [courseMap])

  // Set up an interval to sync and fetch plans regularly
  useEffect(() => {
    const intervalId = setInterval(async () => {
        try {
            await syncPlansWithServer(courseMapRef.current, updateCourseMap, markUnsavedChanges)
            const plans = await fetchPlansFromServer()
            updatePlans(plans)
        } catch (error) {
            console.error("Error during synchronization or fetching plans:", error)
    }}, 10000)  // Execute every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [courseMap])
}

export default usePlanSync