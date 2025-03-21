import { useMemo, useRef } from "react";
import { 
    fetchGuestPlans, 
    fetchUserPlans, 
    saveGuestPlans, 
    saveUserPlans, 
    syncPendingPlans, 
    syncPlansWithServer
} from '../Handlers/PlansHandlers.jsx';

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
function usePlansManager(user, initialPlans, defaultPlans, pushPlans, subjectDataMap, bulkUpdateSubjects) {
    const hasUnsavedChangesRef = useRef(false);
    const subjectDataMapRef = useRef(subjectDataMap);

    useMemo(() => {
        let retrievedPlans = initialPlans ?? defaultPlans;
        console.log("initializing plans with", retrievedPlans);
    
        bulkUpdateSubjects(retrievedPlans.flatMap(semester =>
            semester.subjects.map(subject => ({
                subjectCode: subject.code,
                updates: { plan: subject.plan, semester: semester.semesterId }
            }))
        ));
        
        pushPlans(retrievedPlans, "Initialize Plans");
    }, [])

    return null;
}

export default usePlansManager;
