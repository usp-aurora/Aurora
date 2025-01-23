import { useEffect, useRef } from "react"
import { 
    fetchPlansFromServer, 
    persistPlansToLocalStorage, 
    syncPendingPlans 
} from '../Handlers/PlansHandlers.jsx'

/**
 * Custom hook that manages page lifecycle events for syncing plans data.
 * 
 * @param {Map} courseMap - Map containing course data.
 * @param {Boolean} unsavedChanges - Tracks if there are unsaved changes.
 * @param {Function} setIsLoading - Function to set the page loading state.
 * @param {Function} setPlans - Function to set the plans state.
 * @param {Function} updateCourseMap - Function to update the course map state.
 */
function useLifecycleHandlers(courseMap, unsavedChanges, setIsLoading, setPlans, updateCourseMap) {
    const courseMapRef = useRef(courseMap)
    const unsavedChangesRef = useRef(unsavedChanges)

    /**
     * Updates the course map with plan details from the provided plans array.
     * 
     * @param {Map} currentCourseMap - The existing course map.
     * @param {Array} plans - Array of plans to merge into the course map.
     */
    function updateCourseMapWithPlans(currentCourseMap, plans) {
        const updatedCourseMap = new Map(currentCourseMap)
        plans.forEach((semester) => {
            semester.courses.forEach((course) => 
                updatedCourseMap.set(course.id, {
                    ...currentCourseMap.get(course.id),
                    plan: course.plan,
                    semester: semester.id,
                })
            )
        })
        updateCourseMap(updatedCourseMap)
    }

    /**
     * Handles the initial page load process, syncing unsynced plans 
     * and fetching the latest plans from the server.
     */
    async function handlePageLoad() {
        try {
            await syncPendingPlans()
            const plans = await fetchPlansFromServer()
            updateCourseMapWithPlans(courseMap, plans)
            setPlans(plans)
        } catch (error) {
            console.error("Error fetching plans:", error)
        } finally {
            setIsLoading(false)
            window.removeEventListener("load", handlePageLoad)
        }
    }

    /**
     * Handles actions to perform before the page unloads, such as saving
     * unsaved plans to local storage.
     * 
     * @param {Event} event - The beforeunload event.
     */
    function handlePageUnload(event) {
        if (unsavedChangesRef.current) {
            event.preventDefault()
            persistPlansToLocalStorage(courseMapRef.current)
        }
    }

    window.addEventListener("load", handlePageLoad) 

    useEffect(() => {
        window.addEventListener("beforeunload", handlePageUnload) 

        return () => {
            window.removeEventListener("beforeunload", handlePageUnload)
        }
    }, [handlePageUnload])

    useEffect(() => {
        courseMapRef.current = courseMap
    }, [courseMap])

    useEffect(() => {
        unsavedChangesRef.current = unsavedChanges
    }, [unsavedChanges])

}

export default useLifecycleHandlers
