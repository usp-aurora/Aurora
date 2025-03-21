import { createContext, useContext, useState } from 'react';
import { useSubjectMapContext } from "../Hooks/useSubjectMapContext";
import { usePlansContext } from "../Hooks/usePlansContext";


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
	
	const { subjectDataMap } = useSubjectMapContext();
    const { plansSet } = usePlansContext();
	
	const showSubjectInfo = (subjectCode) => {
		const subjectData = subjectDataMap[subjectCode];
		if (!subjectData) return;

		setSubjectInfoModalOpen(true);
		setSubjectInfo({
			isPlanned: plansSet.has(subjectCode),
			name: subjectData.name,
			code: subjectCode,
			tags: subjectData.groups,
			credits: subjectData.credits,
			desc: subjectData.syllabus
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