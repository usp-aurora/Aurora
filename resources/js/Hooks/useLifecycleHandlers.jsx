import { useEffect, useRef } from "react"
import { 
    fetchGuestPlans, 
    fetchUserPlans, 
    saveGuestPlans, 
    saveUserPlans, 
    syncPendingPlans 
} from '../Handlers/PlansHandlers.jsx'
import { useAuth } from './useAuthContext.jsx'


/**
 * Custom hook to handle page lifecycle for managing and syncing plans data.
 * 
 * @param {Map} courseMap - Current mapping of courses.
 * @param {Array} plans - Current plans structure (grouped by semester).
 * @param {boolean} hasUnsavedChanges - Indicates if there are unsaved changes.
 * @param {Function} setIsPlansLoading - Function to update the plans loading state.
 * @param {Function} setPlans - Function to update the plans.
 * @param {Function} updateCourseMap - Function to update the course map.
 */
function useLifecycleHandlers(courseMap, plans, hasUnsavedChanges, setIsPlansLoading, setPlans, updateCourseMap) {
    const { authUser, isAuthLoading } = useAuth();
    const plansRef = useRef(plans);
    const courseMapRef = useRef(courseMap);
    const unsavedChangesRef = useRef(hasUnsavedChanges);

    /**
     * Merges plan data into the existing course map.
     * 
     * @param {Map} currentCourseMap - The existing course map.
     * @param {Array} retrievedPlans - Plans data to merge.
     */
    function mergePlansIntoCourseMap(currentCourseMap, retrievedPlans) {
        const updatedCourseMap = new Map(currentCourseMap);

        retrievedPlans.forEach((semester) => {
            semester.courses.forEach((course) => {
                updatedCourseMap.set(course.id, {
                    ...currentCourseMap.get(course.id),
                    plan: course.plan,
                    semester: semester.id,
                });
            });
        });

        updateCourseMap(updatedCourseMap);
    }

    /**
     * Handles the initial loading of plans.
     * - Syncs pending changes.
     * - Fetches plans (from server if authenticated, or from local storage otherwise).
     */
	async function initializePlans() {
		try {
			let plans;
            if (authUser) { 
                await syncPendingPlans(); 
                plans = await fetchUserPlans() ?? [];
            } else {
                plans = fetchGuestPlans() ?? [];
            }

            mergePlansIntoCourseMap(courseMap, plans);
            setPlans(plans);     
		} catch (error) {
			console.warn("Failed to load plans:", error);
            setPlans([]);
		} finally {
			setIsPlansLoading(false);
		}
	}

    /**
     * Saves plans when the user leaves the page.
     * - Saves as guest plans if not authenticated.
     * - Saves as user plans if authenticated.
     * 
     * @param {Event} event - The beforeunload event.
     */
    function handlePageUnload(event) {
        if (unsavedChangesRef.current || !authUser) {
            event.preventDefault();
            if (authUser) saveUserPlans(courseMapRef.current);
            else saveGuestPlans(plansRef.current);      
        }
    }

	// Load plans on initial render once auth loading is complete
	useEffect(() => {
		if (!isAuthLoading) {
			initializePlans();
		}
	}, [isAuthLoading]);

	// Add and remove the beforeunload event listener
	useEffect(() => {
		window.addEventListener("beforeunload", handlePageUnload);

		return () => {
			window.removeEventListener("beforeunload", handlePageUnload);
		};
	}, [authUser]);

	// Keep refs in sync with props
	useEffect(() => {
		courseMapRef.current = courseMap;
	}, [courseMap]);

	useEffect(() => {
		plansRef.current = plans;
	}, [plans]);

	useEffect(() => {
		unsavedChangesRef.current = hasUnsavedChanges;
	}, [hasUnsavedChanges]);

}

export default useLifecycleHandlers;