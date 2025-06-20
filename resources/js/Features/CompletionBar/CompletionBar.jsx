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

function getExcessSum(valuesList, amount, needed) {
	if (amount <= needed) return 0;
	const capacity = amount - needed;
	const dp = Array(capacity + 1).fill(false);
	dp[0] = true;

	for (const v of valuesList)
		for (let j = capacity; j >= v; j--)
			if (dp[j - v]) 
				dp[j] = true;

	for (let sum = capacity; sum >= 0; sum--)
		if (dp[sum]) 
			return sum;
	return 0;
}

function CompletionBar() {
	const { subjectDataMap } = useSubjectMapContext();
	const { plansSet } = usePlansContext();
	const MANDATORY_NECESSARY = 111;
	const ELECTIVE_NECESSARY = 87;
	const LIVRE_NECESSARY = 24;
	const SCIENCE_NECESSARY = 4;
	const HUMANITIES_NECESSARY = 3;
	const STATISTICS_NECESSARY = 4;

	const completion = useMemo(() => {
		let mandatoryCredits = 0;
		let electiveCredits = 0;
		let electiveCreditsList = [];
		let statisticsCredits = 0;
		let statisticsCreditsList = [];
		let humanitiesCredits = 0;
		let humanitiesCreditsList = [];
		let scienceCredits = 0;
		let scienceCreditsList = [];
		let livreCredits = 0;
		plansSet.forEach(subjectCode => {
			const subject = subjectDataMap[subjectCode];
			if (!subject) return;

			if (subject.groups.some(group => group === "Obrigatórias")) {
				mandatoryCredits += parseInt(subject.credits[0], 10);
				mandatoryCredits += parseInt(subject.credits[1], 10);
			} else if (subject.groups.some(group => group === "Optativas Livres")) {
				livreCredits += parseInt(subject.credits[0], 10);
				livreCredits += parseInt(subject.credits[1], 10);
			} else if (subject.groups.some(group => group === "Optativas de Estatística")) {
				statisticsCredits += parseInt(subject.credits[0], 10);
				statisticsCredits += parseInt(subject.credits[1], 10);
				statisticsCreditsList.push(parseInt(subject.credits[0], 10) + parseInt(subject.credits[1], 10));
			} else if (subject.groups.some(group => group === "Optativas de Humanidades")) {
				humanitiesCredits += parseInt(subject.credits[0], 10);
				humanitiesCredits += parseInt(subject.credits[1], 10);
				humanitiesCreditsList.push(parseInt(subject.credits[0], 10) + parseInt(subject.credits[1], 10));
			} else if (subject.groups.some(group => group === "Optativas de Ciências")) {
				scienceCredits += parseInt(subject.credits[0], 10);
				scienceCredits += parseInt(subject.credits[1], 10);
				scienceCreditsList.push(parseInt(subject.credits[0], 10) + parseInt(subject.credits[1], 10));
			} else {
				electiveCredits += parseInt(subject.credits[0], 10);
				electiveCredits += parseInt(subject.credits[1], 10);
				electiveCreditsList.push(parseInt(subject.credits[0], 10) + parseInt(subject.credits[1], 10));
			}
		});
		
		let excess = getExcessSum(scienceCreditsList, scienceCredits, SCIENCE_NECESSARY);
		livreCredits += excess;
		scienceCredits -= excess;
		excess = getExcessSum(humanitiesCreditsList, humanitiesCredits, HUMANITIES_NECESSARY);
		livreCredits += excess;
		humanitiesCredits -= excess;
		excess = getExcessSum(statisticsCreditsList, statisticsCredits, STATISTICS_NECESSARY);
		livreCredits += excess;
		statisticsCredits -= excess;
		excess = getExcessSum(electiveCreditsList, electiveCredits, ELECTIVE_NECESSARY);
		livreCredits += excess;
		electiveCredits -= excess;

		return { "mandatory": mandatoryCredits, "elective": electiveCredits , "livre": livreCredits };
	}, [subjectDataMap, plansSet]);

	const mandatory = { label: "Obrigatórias", coursed: completion["mandatory"], planned: 0, needed: MANDATORY_NECESSARY };
	const elective = { label: "Optativas", coursed: completion["elective"], planned: 0, needed: ELECTIVE_NECESSARY };
	const livres = {label: "Livres", coursed: completion["livre"], planned: 0, needed: LIVRE_NECESSARY }

	return (
		<CompletionBarContainer>
			<ProgressBar label={mandatory.label} coursed={mandatory.coursed} planned={mandatory.planned} needed={mandatory.needed} color="primary" />
			<ProgressBar label={elective.label} coursed={elective.coursed} planned={elective.planned} needed={elective.needed} color="orange" />
			<ProgressBar label={livres.label} coursed={livres.coursed} planned={livres.planned} needed={livres.needed} color="green" />
		</CompletionBarContainer>
	);
};

export default CompletionBar;