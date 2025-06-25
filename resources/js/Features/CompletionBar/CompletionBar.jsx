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
	const MANDATORY_NECESSARY = 111;
	const ELECTIVE_NECESSARY = 87;
	const OPEN_ELECTIVE_NECESSARY = 24;
	const SCIENCE_NECESSARY = 4;
	const HUMANITIES_NECESSARY = 3;
	const STATISTICS_NECESSARY = 4;

	const completion = useMemo(() => {
		let mandatoryCredits = 0;
		let electiveCredits = 0;
		let statisticsCredits = 0;
		let humanitiesCredits = 0;
		let scienceCredits = 0;
		let openElectiveCredits = 0;

		const subjectGroupsStack = [];
		plansSet.forEach(subjectCode => {
			const subject = subjectDataMap[subjectCode];
			if (subject) {
				const totalCredits = parseInt(subject.credits[0], 10) + parseInt(subject.credits[1], 10);
				const groups = subject.groups.filter(group => group !== "Optativas Livres");
				subjectGroupsStack.push({ subjectCode, groups: groups, totalCredits: totalCredits });
			}
		});


		while (subjectGroupsStack.length() > 0) {
			let { subjectCode, groups, totalCredits } = subjectGroupsStack.shift();
			console.log(subjectCode, groups, totalCredits);

			if (groups.some(group => group === "Obrigatórias")) {
				mandatoryCredits += totalCredits;
			}
			else if (groups.some(group => group === "Optativas de Estatística")) {
				if (statisticsCredits + totalCredits <= STATISTICS_NECESSARY) {
					statisticsCredits += totalCredits;
				}
				else {
					subjectGroupsStack.push({ subjectCode, groups: groups.filter(group => group !== "Optativas de Estatística"), totalCredits });
				}
			}
			else if (groups.some(group => group === "Optativas de Humanidades")) {
				if (humanitiesCredits + totalCredits <= HUMANITIES_NECESSARY) {
					humanitiesCredits += totalCredits;
				}
				else {
					subjectGroupsStack.push({ subjectCode, groups: groups.filter(group => group !== "Optativas de Humanidades"), totalCredits });
				}
			}
			else if (groups.some(group => group === "Optativas de Ciências")) {
				if (scienceCredits + totalCredits <= SCIENCE_NECESSARY) {
					scienceCredits += totalCredits;
				}
				else {
					subjectGroupsStack.push({ subjectCode, groups: groups.filter(group => group !== "Optativas de Ciências"), totalCredits });
				}
			}
			else if (groups.length > 0) {
				if (electiveCredits + totalCredits <= ELECTIVE_NECESSARY) {
					electiveCredits += totalCredits;
				}
				else {
					subjectGroupsStack.push({ subjectCode, groups: [], totalCredits });
				}
			}
			else {
				openElectiveCredits += totalCredits;
			}
		}
		return { "mandatory": mandatoryCredits, "elective": electiveCredits, "openElective": openElectiveCredits };
	}, [subjectDataMap, plansSet]);

	const mandatory = { label: "Obrigatórias", coursed: completion["mandatory"], planned: 0, needed: MANDATORY_NECESSARY };
	const elective = { label: "Optativas", coursed: completion["elective"], planned: 0, needed: ELECTIVE_NECESSARY };
	const livres = { label: "Livres", coursed: completion["openElective"], planned: 0, needed: OPEN_ELECTIVE_NECESSARY }

	return (
		<CompletionBarContainer>
			<ProgressBar label={mandatory.label} coursed={mandatory.coursed} planned={mandatory.planned} needed={mandatory.needed} color="primary" />
			<ProgressBar label={elective.label} coursed={elective.coursed} planned={elective.planned} needed={elective.needed} color="orange" />
			<ProgressBar label={livres.label} coursed={livres.coursed} planned={livres.planned} needed={livres.needed} color="green" />
		</CompletionBarContainer>
	);
};

export default CompletionBar;