import axios from 'axios';

async function saveWithServer(unsavedPlans) {
	try {
		const response = await axios.post('/api/plans/sync', unsavedPlans);

		if (response.status === 200) {
			return true
		}
		else {
			console.error('Server synchronization failed:', response.data);
		}
	} catch (error) {
		console.error('Error communicating with the server:', error);
	}
	return false;
}

export async function savePlans(user, lastSavedPlans, currentPlans) {
	if (!user) {
		return false;
	}

	const unsavedPlans = [];
	const lastSubjectsSet = new Set();

	lastSavedPlans.forEach((lastSemester) => {
		lastSemester.subjects.forEach((lastSubject) => {
			lastSubjectsSet.add(lastSubject.code);
		});
	});

	currentPlans.forEach((currentSemester) => {
		const lastSemester = lastSavedPlans.find(
			(semester) => semester.semesterId === currentSemester.semesterId
		);

		currentSemester.subjects.forEach((currentSubject) => {
			lastSubjectsSet.delete(currentSubject.code);

			const lastSubject = lastSemester?.subjects.find(
				(subject) => subject.code === currentSubject.code
			);

			if (!lastSubject) {
				unsavedPlans.push({
					subject_code: currentSubject.code,
					semester: currentSemester.semesterId,
				});
			}
		});
	});

	// Add subjects that were removed from the current plans
	lastSubjectsSet.forEach((subjectCode) => {
		unsavedPlans.push({
			subject_code: subjectCode,
			semester: null,
		});
	});

	return await saveWithServer(unsavedPlans);
}