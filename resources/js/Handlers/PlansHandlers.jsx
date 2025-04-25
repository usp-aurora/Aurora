import axios from 'axios';

async function saveWithServer(unsavedPlans) {
	try {
		const response = await axios.post('/api/plans/sync', unsavedPlans);

		if (!(response.status === 200)) {
			console.error('Server synchronization failed:', response.data);
		}
	} catch (error) {
		console.error('Error communicating with the server:', error);
	}
}

async function saveWithLocalStorage(plans) {
	localStorage.setItem('plans', JSON.stringify(plans));
}

export async function savePlans(user, lastSavedPlans, currentPlans) {
	if(!user) {
		saveWithLocalStorage(currentPlans);
		return;
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

	await saveWithServer(unsavedPlans);
}