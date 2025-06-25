import { createContext, useContext, useEffect, useState } from 'react';

const SubjectMapContext = createContext();

function SubjectMapProvider({ children, subjectData }) {
	const [subjectDataMap, setSubjectDataMap] = useState(subjectData);
	
	const changeSubjectGroup = (code, newGroups) => {
		setSubjectDataMap((prevMap) => {
			let updatedMap = { ...prevMap };
			updatedMap[code].groups = newGroups;
			return updatedMap;
		});
	};

	return (
		<SubjectMapContext.Provider value={{ subjectDataMap, changeSubjectGroup }}>
			{children}
		</SubjectMapContext.Provider>
	);
};

function useSubjectMapContext() { return useContext(SubjectMapContext) }

export { SubjectMapProvider, useSubjectMapContext };
