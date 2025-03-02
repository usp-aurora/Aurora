import { createContext, useContext, useState, useEffect } from 'react';

const SubjectPickerContext = createContext();

function SubjectPickerProvider({ children, subjectPickerStartsOpened = false })  {
	const [isSubjectPickerModalOpen, setSubjectPickerModalOpen] = useState(subjectPickerStartsOpened);

	const showSubjectPickerModal = () => {
		setSubjectPickerModalOpen(true);
	};

	const closeSubjectPickerModal = () => {
		setSubjectPickerModalOpen(false);
	}

	return (
		<SubjectPickerContext.Provider value={{ isSubjectPickerModalOpen, closeSubjectPickerModal, showSubjectPickerModal }}>
			{children}
		</SubjectPickerContext.Provider>
	);
};

function useSubjectPickerContext() { return useContext(SubjectPickerContext) }

export {useSubjectPickerContext, SubjectPickerProvider}