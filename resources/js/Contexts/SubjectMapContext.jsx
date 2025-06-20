import { createContext, useContext, useEffect, useState } from 'react';
import { localStorageIntoMap, changeSubjectGroup } from './utils/subjectMapUtils';

const SubjectMapContext = createContext();

function SubjectMapProvider({ children, subjectDataMap, user }) {
	const [transformedSubjectDataMap, setTransformedSubjectDataMap] = useState(() => localStorageIntoMap(subjectDataMap));

	// Retrieve and merge localStorage data when initializing the component
	useEffect(() => {
		if (user) return;
		setTransformedSubjectDataMap(localStorageIntoMap(subjectDataMap, user));
	}, [subjectDataMap]);

	const refreshSubjectMapFromLocalStorage = () => {
		setTransformedSubjectDataMap(localStorageIntoMap(subjectDataMap));
	};

	// Change the group of a specific subject in the subjectDataMap
	const refreshSubjectMapSubject = (code, groupName) => {
		setTransformedSubjectDataMap((prevMap) => changeSubjectGroup(prevMap, code, groupName));
	};

	return (
		<SubjectMapContext.Provider value={{ subjectDataMap: transformedSubjectDataMap, refreshSubjectMapFromLocalStorage, refreshSubjectMapSubject }}>
			{children}
		</SubjectMapContext.Provider>
	);
};

function useSubjectMapContext() { return useContext(SubjectMapContext) }

export { SubjectMapProvider, useSubjectMapContext };
