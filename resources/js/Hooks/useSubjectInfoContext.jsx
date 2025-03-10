import { createContext, useContext, useState, useEffect } from 'react';

const SubjectInfoContext = createContext();

function SubjectInfoProvider({ children, subjectDataMap })  {
	const [isSubjectInfoModalOpen, setSubjectInfoModalOpen] = useState(false);

	const [subjectInfo, setSubjectInfo] = useState({
		isPlanned: false,
		name: "",
		code: "",
		tags: [],
		credits: 0,
		desc: "",
	});
	
	const showSubjectInfo = (subject) => {
		setSubjectInfoModalOpen(true);
		setSubjectInfo({
			isPlanned: subject.isPlanned,
			name: subject.name,
			code: subject.code,
			tags: subjectDataMap.get(subject.code)?.tags || [],
			credits: subject.credits,
			desc: subject.desc
		});
	};

	const closeSubjectInfoModal = () => {
		setSubjectInfoModalOpen(false);
	}

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				closeSubjectInfoModal();
			}
		};

		if (isSubjectInfoModalOpen) {
			window.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSubjectInfoModalOpen]);

	return (
		<SubjectInfoContext.Provider value={{ subjectInfo, isSubjectInfoModalOpen, closeSubjectInfoModal, showSubjectInfo }}>
			{children}
		</SubjectInfoContext.Provider>
	);
};

function useSubjectInfoContext() { return useContext(SubjectInfoContext) }

export {useSubjectInfoContext, SubjectInfoProvider}