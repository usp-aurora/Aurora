import { createContext, useContext, useState } from 'react';

const SubjectMapContext = createContext();

function SubjectMapProvider({ children, subjectDataMap: initialMap }) {
	const [subjectDataMap, setSubjectDataMap] = useState(initialMap || {});
	
	const addNewSubjectData = (subjectData) => {
		setSubjectDataMap(prev => {
			const updated = { ...prev, ...subjectData };
			return updated;
		});
	}

	const changeSubjectGroup = (code, newGroups) => {
		setSubjectDataMap((prevMap) => {
			let updatedMap = { ...prevMap };
			updatedMap[code].groups = newGroups;
			return updatedMap;
		});
	}

	return (
		<SubjectMapContext.Provider value={{ subjectDataMap, changeSubjectGroup, addNewSubjectData }}>
			{children}
		</SubjectMapContext.Provider>
	);
}

function useSubjectMapContext() {
	return useContext(SubjectMapContext);
}

export { SubjectMapProvider, useSubjectMapContext };
