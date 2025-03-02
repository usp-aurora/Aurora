import { createContext, useContext, useState, useEffect } from 'react';

const SubjectInfoContext = createContext();

const defaultSubjectInfo = {
    isPlanned: false,
    name: "",
    code: "",
    // tags: [{ name: "", color: "" }],
    credits: 0,
    desc: "",
};

function SubjectInfoProvider({ children, subjectInfoStartsOpened = false, initialSubjectInfo = defaultSubjectInfo})  {
	const [isSubjectInfoModalOpen, setSubjectInfoModalOpen] = useState(subjectInfoStartsOpened);
	const [subjectInfo, setSubjectInfo] = useState(initialSubjectInfo);
	
	const showSubjectInfo = (subject) => {
		setSubjectInfoModalOpen(true);
		setSubjectInfo({
			isPlanned: subject.isPlanned,
			name: subject.name,
			code: subject.code,
			tags: subject.tags,
			credits: subject.credits,
			desc: subject.desc
		});
	};

	const closeSubjectInfoModal = () => {
		setSubjectInfoModalOpen(false);
	}

	return (
		<SubjectInfoContext.Provider value={{ subjectInfo, isSubjectInfoModalOpen, closeSubjectInfoModal, showSubjectInfo }}>
			{children}
		</SubjectInfoContext.Provider>
	);
};

function useSubjectInfoContext() { return useContext(SubjectInfoContext) }

export {useSubjectInfoContext, SubjectInfoProvider}