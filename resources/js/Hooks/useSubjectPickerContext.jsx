import { createContext, useContext, useState, useEffect } from 'react';

const SubjectPickerContext = createContext();

function SubjectPickerProvider({ children })  {
	const [isSubjectPickerModalOpen, setSubjectPickerModalOpen] = useState(false);

	const showSubjectPickerModal = () => {
		setSubjectPickerModalOpen(true);
	};

	const closeSubjectPickerModal = () => {
		setSubjectPickerModalOpen(false);
	}

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				closeSubjectPickerModal();
			}
		};
		
		if (isSubjectPickerModalOpen) {
			window.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSubjectPickerModalOpen]);


	return (
		<SubjectPickerContext.Provider value={{ isSubjectPickerModalOpen, closeSubjectPickerModal, showSubjectPickerModal }}>
			{children}
		</SubjectPickerContext.Provider>
	);
};

function useSubjectPickerContext() { return useContext(SubjectPickerContext) }

export {useSubjectPickerContext, SubjectPickerProvider}