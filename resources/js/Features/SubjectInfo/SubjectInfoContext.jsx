import { createContext, useContext, useState } from 'react';
import { usePlansContext } from "../../Contexts/PlansContext";
import { useSubjectMapContext } from "../../Contexts/SubjectMapContext";


const SubjectInfoContext = createContext();

const defaultSubjectInfo = {
    isPlanned: false,
    name: "",
    code: "",
    tags: [""],
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
		console.log("subjectData.groups", subjectData.groups);

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

export { SubjectInfoProvider, useSubjectInfoContext };
