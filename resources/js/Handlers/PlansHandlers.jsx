import axios from 'axios';

/**
 * Retrieves stored plans from local storage for guest users.
 * The retrieved plans are removed from storage after fetching.
 *
 * @returns {Array | null} Plans grouped by semester, or null if none are found.
 */
function fetchGuestPlans() {
	const storedPlans = localStorage.getItem('guestPlans');
	localStorage.removeItem('guestPlans');
  	return storedPlans ? JSON.parse(storedPlans) : null;
}

/**
 * Saves guest user plans to local storage, ensuring only up to the last non-empty semester is retained.
 *
 * @param {Array} guestPlans - Plans grouped by semester.
 */
function saveGuestPlans(guestPlans) {
	const lastSemester = guestPlans.findLastIndex((sem) => sem.subjects.length > 0) + 1;
  	localStorage.setItem('guestPlans', JSON.stringify(guestPlans.slice(0, Math.max(8, lastSemester))));
}

/**
 * Saves unsynced plans to local storage for future synchronization.
 *
 * @param {Map} subjectDataMap - The current state of subjects mapped by their codes.
 */
function saveUserPlans(subjectDataMap) {
  	const unsavedSubjects = Array.from(subjectDataMap)
    	.filter(([, subject]) => subject.unsaved)
    	.map(([subjectCode, { plan, semester }]) => ({
     		id: plan,
      		subject_code: subjectCode,
      		semester,
    }));

  	if (unsavedSubjects.length > 0)
    	localStorage.setItem('unsyncedPlans', JSON.stringify(unsavedSubjects));
}

/**
 * Fetches the latest plans from the server.
 *
 * @returns {Promise<Array>} A promise that resolves to the list of plans.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function fetchUserPlans() {
	try {
    	const response = await fetch('/api/plans/index');
    	const data = await response.json();
    	return data.plans;
  	} catch (error) {
    	throw error;
  	}
}

/**
 * Synchronizes unsaved plans with the server.
 *
 * Filters out subjects marked as `unsaved`, sends them to the server,
 * and updates the local state accordingly based on the server response.
 *
 * @param {Map} subjectDataMap - The current state of subjects mapped by their codes.
 * @param {Function} updateSubjects - Function to apply bulk updates to the subject data map.
 */
async function syncPlansWithServer(subjectDataMap, updateSubjects) {
	try {
    	const unsavedSubjects = Array.from(subjectDataMap)
      		.filter(([, subject]) => subject.unsaved)
      		.map(([subjectCode, { plan, semester }]) => ({
        		id: plan,
        		subject_code: subjectCode,
        		semester,
      	}));

    	if (unsavedSubjects.length === 0) return;

    	const response = await axios.post('/api/plans/sync', JSON.stringify(unsavedSubjects));

    	if (response.status === 200) {
			const { changedPlans } = response.data;

			updateSubjects(
				changedPlans.map(({ id, subject_code, action }) => ({
				subjectCode: subject_code,
				updates: (() => {
					switch (action) {
						case 'created':
						case 'updated':
							return { plan: id, unsaved: false };
						case 'deleted':
							return { plan: null, unsaved: false };
						default:
							return {}; // Fallback for unrecognized actions
					}
				})(),
			})));
    	} else {
      		console.error('Server synchronization failed:', response.data);
    	}
  	} catch (error) {
    	console.error('Error communicating with the server:', error);
  	}
}

/**
 * Attempts to synchronize any locally stored unsynced plans with the server.
 *
 * If synchronization succeeds, the local unsynced data is removed.
 */
async function syncPendingPlans() {
	const unsyncedPlans = localStorage.getItem('unsyncedPlans');

  	if (unsyncedPlans) {
    	try {
      		const response = await axios.post('/api/plans/sync', unsyncedPlans);
      		if (response.status === 200)
        		localStorage.removeItem('unsyncedPlans');
    	} catch (error) {
      		console.error('Error synchronizing unsynced plans:', error);
    	}
  	}
}

export {
  fetchGuestPlans,
  fetchUserPlans,
  saveGuestPlans,
  saveUserPlans,
  syncPlansWithServer,
  syncPendingPlans,
};