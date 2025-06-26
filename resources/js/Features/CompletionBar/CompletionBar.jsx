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
	const MANDATORY_NECESSARY = 108;
	const ELECTIVE_NECESSARY = 52;
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
				const groups = subject.groups.filter(group => group.title !== "Optativas Livres");

				subjectGroupsStack.push({ subjectCode: subjectCode, groups: groups, totalCredits: totalCredits });
			}
		});


		while (subjectGroupsStack.length > 0) {
			let { subjectCode, groups, totalCredits } = subjectGroupsStack.shift();

			if (groups.some(group => group.title === "Obrigatórias")) {
				mandatoryCredits += totalCredits;
			}
			else if (groups.some(group => group.title === "Optativas de Estatística")) {
				if (statisticsCredits >= STATISTICS_NECESSARY) {
					subjectGroupsStack.push({ subjectCode, groups: groups.filter(group => group.title !== "Optativas de Estatística"), totalCredits });
				}
				else {
					statisticsCredits += totalCredits;
				}
			}
			else if (groups.some(group => group.title === "Optativas de Humanidades")) {
				if (humanitiesCredits >= HUMANITIES_NECESSARY) {
					subjectGroupsStack.push({ subjectCode, groups: groups.filter(group => group.title !== "Optativas de Humanidades"), totalCredits });
				}
				else {
					humanitiesCredits += totalCredits;
				}
			}
			else if (groups.some(group => group.title === "Optativas de Ciências")) {
				if (scienceCredits >= SCIENCE_NECESSARY) {
					subjectGroupsStack.push({ subjectCode, groups: groups.filter(group => group.title !== "Optativas de Ciências"), totalCredits });
				}
				else {
					scienceCredits += totalCredits;
				}
			}
			else if (groups.length > 0) {
				if (electiveCredits >= ELECTIVE_NECESSARY) {
					subjectGroupsStack.push({ subjectCode, groups: [], totalCredits });
				}
				else {
					electiveCredits += totalCredits;
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
			<ProgressBar label={mandatory.label} coursed={mandatory.coursed} planned={mandatory.planned} needed={mandatory.needed} color="blue" />
			<ProgressBar label={elective.label} coursed={elective.coursed} planned={elective.planned} needed={elective.needed} color="orange" />
			<ProgressBar label={livres.label} coursed={livres.coursed} planned={livres.planned} needed={livres.needed} color="cyan" />
		</CompletionBarContainer>
	);
};

export default CompletionBar;