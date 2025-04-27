import { createContext, useContext } from 'react';

const SubjectMapContext = createContext();

function SubjectMapProvider({ children, subjectDataMap }) {

	return (
		<SubjectMapContext.Provider value={{ subjectDataMap }}>
			{children}
		</SubjectMapContext.Provider>
	);
};

function useSubjectMapContext() { return useContext(SubjectMapContext) }

export { SubjectMapProvider, useSubjectMapContext };
