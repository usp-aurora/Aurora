import { useEffect, useRef } from "react"
import { 
    fetchUserPlans, 
    syncPlansWithServer 
} from '../Handlers/PlansHandlers.jsx'
import { useAuth } from './useAuthContext.jsx'

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
  const {authUser} = useAuth();

  useEffect(() => {
    courseMapRef.current = courseMap
  }, [courseMap])

  // Set up an interval to sync and fetch plans regularly
  useEffect(() => {
    const intervalId = setInterval(async () => {
      if(authUser) try {
            await syncPlansWithServer(courseMapRef.current, updateCourseMap, markUnsavedChanges)
            const plans = await fetchUserPlans()
            updatePlans(plans)
        } catch (error) {
            console.error("Error during synchronization or fetching plans:", error)
    }}, 10000)  // Execute every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [courseMap, authUser])
}

export default usePlanSync