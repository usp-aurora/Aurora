import { createContext, useContext, useState } from 'react';

const SubjectMapContext = createContext();

function SubjectMapProvider({ children, subjectDataMap: initialMap }) {
	const [subjectDataMap, setSubjectDataMap] = useState(initialMap || {});

	const addSubjectData = (subjectData) => {
		setSubjectDataMap(prev => {
			const updated = { ...prev, ...subjectData };
			return updated;
		});
	};

	return (
		<SubjectMapContext.Provider value={{ subjectDataMap, addSubjectData }}>
			{children}
		</SubjectMapContext.Provider>
	);
}

function useSubjectMapContext() {
	return useContext(SubjectMapContext);
}

export { SubjectMapProvider, useSubjectMapContext };
