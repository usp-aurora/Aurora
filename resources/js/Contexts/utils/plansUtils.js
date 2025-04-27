import axios from 'axios';

async function saveWithServer(unsavedPlans) {
	try {
		const response = await axios.post('/api/plans/sync', unsavedPlans);
		
		if (response.status === 200) {
			return true
		}
		else{
			console.error('Server synchronization failed:', response.data);
		}
	} catch (error) {
		console.error('Error communicating with the server:', error);
	}
	return false;
}

async function saveWithLocalStorage(plans) {
    try {
        const serializedPlans = JSON.stringify(plans);
        localStorage.setItem('plans', serializedPlans);
        return true;
    } catch (error) {
        console.error('Failed to save plans to localStorage:', error);
        return false;
    }
}

export async function savePlans(user, lastSavedPlans, currentPlans) {
	if(!user) {
		return await saveWithLocalStorage(currentPlans);
	}
	
	const unsavedPlans = [];

	currentPlans.forEach((currentSemester) => {
		const lastSemester = lastSavedPlans.find(
			(semester) => semester.semesterId === currentSemester.semesterId
		);

		currentSemester.subjects.forEach((currentSubject) => {
			const lastSubject = lastSemester?.subjects.find(
				(subject) => subject.code === currentSubject.code
			);

			if (!lastSubject) {
				unsavedPlans.push({
					id: currentSubject.plan,
					subject_code: currentSubject.code,
					semester: currentSemester.semesterId,
				});
			}
		});
	});

	return await saveWithServer(unsavedPlans);
}