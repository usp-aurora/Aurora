import { createContext, useCallback, useContext, useState } from 'react';

const SubjectPickerContext = createContext();

function SubjectPickerProvider({ children, subjectPickerStartsOpened = false }) {
	const [isSubjectPickerModalOpen, setSubjectPickerModalOpen] = useState(subjectPickerStartsOpened);
	const [selectedSemesterMobile, setSelectedSemesterMobile] = useState(null);

	const showSubjectPickerModal = useCallback(function () {
		setSubjectPickerModalOpen(true);
	}, [setSubjectPickerModalOpen]);

	const closeSubjectPickerModal = useCallback(function () {
		setSubjectPickerModalOpen(false);
	}, [setSubjectPickerModalOpen]);

	return (
		<SubjectPickerContext.Provider value={{
			isSubjectPickerModalOpen,
			closeSubjectPickerModal,
			showSubjectPickerModal,
			selectedSemesterMobile,
			setSelectedSemesterMobile
		}}>
			{children}
		</SubjectPickerContext.Provider>
	);
};

function useSubjectPickerContext() { return useContext(SubjectPickerContext) }

export { SubjectPickerProvider, useSubjectPickerContext };
