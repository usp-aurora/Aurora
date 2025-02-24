import { useEffect, useRef } from "react";
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
 * @param {Array} plans - The current plans state from useHistoryState.
 * @param {Array} defaultPlans - The default plans for user. 
 * @param {Function} pushPlans - Function to update plans and track history.
 * @param {Map} subjectDataMap - The current state of subjects mapped by their codes. 
 * @param {Function} updateSubjects - Function to apply bulk updates to the subject data map.
 * @param {Function} setIsPlansLoading - Function to update the plans loading state.
 */
function usePlansManager(plans, defaultPlans, pushPlans, subjectDataMap, updateSubjects, setIsPlansLoading) {
    const { authUser, isAuthLoading } = useAuth();
    const hasUnsavedChangesRef = useRef(false);
    const subjectDataMapRef = useRef(subjectDataMap);

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
                retrievedPlans = fetchGuestPlans() ?? defaultPlans;
            }

            updateSubjects(retrievedPlans.flatMap(semester =>
                semester.subjects.map(subject => ({
                    subjectCode: subject.code,
                    updates: { plan: subject.plan, semester: semester.semesterId }
                }))
            ));
            
            pushPlans(retrievedPlans, "Initialize Plans");
        } catch (error) {
            console.warn("Failed to load plans:", error);
            pushPlans([], "Initialize Plans (Error)");
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
            if (authUser) saveUserPlans(subjectDataMapRef.current);
            else saveGuestPlans(plans);      
        }

        return "teste"
    }

    // Keeps the latest reference of subjectDataMap and detects unsaved changes
    useEffect(() => {
        subjectDataMapRef.current = subjectDataMap;
        hasUnsavedChangesRef.current = Array.from(subjectDataMapRef.current).some(([, subject]) => subject.unsaved);
    }, [subjectDataMap]);
    
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

    useEffect(() => {
        if (!authUser) return;

        // Function to sync plans with the server
        async function syncPlans() {
            try {
                await syncPlansWithServer(subjectDataMapRef.current, updateSubjects);
            } catch (error) {
                console.error("Error during synchronization or fetching plans:", error);
            }
        }

        // Periodic synchronization every 10 seconds
        const intervalId = setInterval(syncPlans, 10000);

        // Handle Ctrl+S to trigger manual synchronization
        function handleKeyDown(event) {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault(); // Prevent the default "Save page" action
                syncPlans();
            }
        }

        // Add event listener for keyboard shortcut
        window.addEventListener("keydown", handleKeyDown);

        // Clean up interval and event listener on component unmount
        return () => {
            clearInterval(intervalId);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [subjectDataMap, authUser]);

    return null;
}

export default usePlansManager;
