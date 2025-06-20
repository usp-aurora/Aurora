import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import { useMemo } from 'react';

import glassmorphismStyle from "../../styles/glassmorphism";
import ProgressBar from './Components/ProgressBar';

import { usePlansContext } from "../../Contexts/PlansContext";
import { useSubjectMapContext } from "../../Contexts/SubjectMapContext";

const CompletionBarContainer = styled(Stack)(({ theme }) => ({
	...glassmorphismStyle(theme, 'level2'),

	borderRadius: '8px',

	width: '100%',
	padding: '8px',
	[theme.breakpoints.up('sm')]: {
		padding: '16px',
		borderRadius: '12px',
	},
}));

function CompletionBar() {
	const { subjectDataMap } = useSubjectMapContext();
	const { plansSet } = usePlansContext();

	const completion = useMemo(() => {
		let mandatoryCredits = 0;
		let electiveCredits = 0;
		let livreCredits = 0;
		let statisticsCredits = [];
		let humanitiesCredits = [];
		let scienceCredits = [];
		plansSet.forEach(subjectCode => {
			const subject = subjectDataMap[subjectCode];
			if (!subject) return;
			// console.log("Subject: ", subject);

			if (subject.groups.some(group => group === "Obrigatórias")) {
				// console.log("OLAA");
				mandatoryCredits += parseInt(subject.credits[0], 10);
				mandatoryCredits += parseInt(subject.credits[1], 10);
			} else if (subject.groups.some(group => group === "Optativas Livres")) {
				// console.log("OLA");
				livreCredits += parseInt(subject.credits[0], 10);
				livreCredits += parseInt(subject.credits[1], 10);
			} else if (subject.groups.some(group => group === "Optativas de Estatística")) {
				// console.log("oi1");
			} else if (subject.groups.some(group => group === "Optativas de Humanidades")) {
				// console.log("oi2");
			} else if (subject.groups.some(group => group === "Optativas de Ciências")) {
				// console.log("oi3");
			} else {
				// console.log("oi4");
				electiveCredits += parseInt(subject.credits[0], 10);
				electiveCredits += parseInt(subject.credits[1], 10);
			}
		});
		return { "mandatory": mandatoryCredits, "elective": electiveCredits , "livre": livreCredits };
	}, [subjectDataMap, plansSet]);

	const mandatory = { label: "Obrigatórias", coursed: completion["mandatory"], planned: 0, needed: 111 };
	const elective = { label: "Optativas", coursed: completion["elective"], planned: 0, needed: 87 };
	const livres = {label: "Livres", coursed: completion["livre"], planned: 0, needed: 24 }

	return (
		<CompletionBarContainer>
			<ProgressBar label={mandatory.label} coursed={mandatory.coursed} planned={mandatory.planned} needed={mandatory.needed} color="primary" />
			<ProgressBar label={elective.label} coursed={elective.coursed} planned={elective.planned} needed={elective.needed} color="orange" />
			<ProgressBar label={livres.label} coursed={livres.coursed} planned={livres.planned} needed={livres.needed} color="green" />
		</CompletionBarContainer>
	);
};

export default CompletionBar;