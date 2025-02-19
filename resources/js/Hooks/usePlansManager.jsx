import { useEffect, useRef, useState } from "react";
import { 
    fetchGuestPlans, 
    fetchUserPlans, 
    saveGuestPlans, 
    saveUserPlans, 
    syncPendingPlans, 
    syncPlansWithServer
} from '../Handlers/PlansHandlers.jsx';
import { useAuth } from './useAuthContext.jsx';

/**
 * Custom hook that manages plan synchronization and lifecycle events.
 * It handles:
 * - Initial plan loading (guest/user plans)
 * - Periodic synchronization with the server
 * - Saving plans before the user leaves the page
 *
 * @param {Map} courseMap - The current mapping of courses.
 * @param {Function} updateCourseMap - Function to update the course map.
 * @param {Function} setIsPlansLoading - Function to update the plans loading state.
 * @returns {[Array, Function]} Returns `plans` state and `setPlans` function.
 */
function usePlansManager(courseMap, updateCourseMap, setIsPlansLoading) {
    const { authUser, isAuthLoading } = useAuth();
    const [plans, setPlans] = useState([]);
    const courseMapRef = useRef(courseMap);
    const hasUnsavedChangesRef = useRef(false);

    /**
     * Merges retrieved plan data into the existing course map.
     *
     * @param {Map} currentCourseMap - The existing course map.
     * @param {Array} retrievedPlans - Plans data to merge.
     */
    function mergePlansIntoCourseMap(currentCourseMap, retrievedPlans) {
        const updatedCourseMap = new Map(currentCourseMap);
        retrievedPlans.forEach((semester) => {
            semester.subjects.forEach((subject) => {
                updatedCourseMap.set(subject.code, {
                    ...currentCourseMap.get(subject.code),
                    plan: subject.plan,
                    semester: semester.semesterId,
                });
            });
        });

        updateCourseMap(updatedCourseMap);
    }

    /**
     * Initializes plans by:
     * - Syncing any pending changes.
     * - Fetching plans from the server if authenticated, otherwise from local storage.
     */
	async function initializePlans() {
		try {
			let retrievedPlans;
            if (authUser) { 
                await syncPendingPlans(); 
                retrievedPlans = await fetchUserPlans() ?? [];
            } else {
                retrievedPlans = fetchGuestPlans() ?? [];
            }

            mergePlansIntoCourseMap(courseMap, retrievedPlans);
            setPlans(retrievedPlans);     
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
        if (hasUnsavedChangesRef.current || !authUser) {
             event.preventDefault();
             if (authUser) saveUserPlans(courseMapRef.current);
             else saveGuestPlans(plans);      
        }
    }

    // Keeps the latest reference of courseMap and detects unsaved changes
    useEffect(() => {
        courseMapRef.current = courseMap;
        hasUnsavedChangesRef.current = Array.from(courseMapRef.current).some(([code, subject]) => subject.unsaved);
    }, [courseMap]);
    
	// Loads plans on initial render once authentication state is resolved
	useEffect(() => {
		if (!isAuthLoading) {
			initializePlans();
		}
	}, [isAuthLoading]);

	// Adds and removes the beforeunload event listener to save plans when the user leaves
	useEffect(() => {
		window.addEventListener("beforeunload", handlePageUnload);
		return () => window.removeEventListener("beforeunload", handlePageUnload);
	}, [authUser, plans]);

    // Periodically syncs plans with the server every 10 seconds
    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (authUser) {
                try {
                    await syncPlansWithServer(courseMapRef.current, updateCourseMap);
                    const updatedPlans = await fetchUserPlans();
                    setPlans(updatedPlans);
                } catch (error) {
                    console.error("Error during synchronization or fetching plans:", error);
                }
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [courseMap, authUser]);

    return [plans, setPlans];
}

export default usePlansManager;
