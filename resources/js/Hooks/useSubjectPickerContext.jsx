import { createContext, useContext, useState, useCallback } from 'react';

const SubjectPickerContext = createContext();

function SubjectPickerProvider({ children, subjectPickerStartsOpened = false })  {
	const [isSubjectPickerModalOpen, setSubjectPickerModalOpen] = useState(subjectPickerStartsOpened);

	const showSubjectPickerModal = useCallback(function(){
		setSubjectPickerModalOpen(true);
	}, [setSubjectPickerModalOpen]);

	const closeSubjectPickerModal = useCallback(function(){
		setSubjectPickerModalOpen(false);
	}, [setSubjectPickerModalOpen]);

	return (
		<SubjectPickerContext.Provider value={{ isSubjectPickerModalOpen, closeSubjectPickerModal, showSubjectPickerModal }}>
			{children}
		</SubjectPickerContext.Provider>
	);
};

function useSubjectPickerContext() { return useContext(SubjectPickerContext) }

export {useSubjectPickerContext, SubjectPickerProvider}