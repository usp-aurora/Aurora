import { createContext, useContext, useState } from 'react';

const SubjectMapContext = createContext();

function SubjectMapProvider({ children, subjectDataMap: initialSubjectDataMap }) {
    const [subjectDataMap, setSubjectDataMap] = useState(initialSubjectDataMap);

    const addUserSubject = (subject) => {
		console.log('Current subjectDataMap:', subjectDataMap);
		console.log('New subject to add:', subject);
        setSubjectDataMap(prev => ({
            ...prev,
            [subject.code]: subject
        }));
    };

    return (
        <SubjectMapContext.Provider value={{ subjectDataMap, addUserSubject }}>
            {children}
        </SubjectMapContext.Provider>
    );
};

function useSubjectMapContext() { return useContext(SubjectMapContext) }

export { SubjectMapProvider, useSubjectMapContext };
