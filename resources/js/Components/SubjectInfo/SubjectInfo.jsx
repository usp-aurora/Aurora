import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Stack, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { fadeIn, fadeOut } from '../Atoms/Animations';
import glassmorphismStyle from '../../styles/MUI/glassmorphismMUI';

import SubjectCard from '../Atoms/Card/SubjectCard';
import GraphView from './GraphView/GraphView';
import SubjectInfoHeader from './SubjectInfoHeader';
import SubjectInfoTags from './SubjectInfoTags';
import SubjectInfoText from './SubjectInfoText';
import Button from '../Atoms/Buttons/Button';
import IconWrapper from '../Atoms/Icons/IconWrapper';

import { useSubjectInfoContext } from '../../Hooks/useSubjectInfoContext';

const SubjectInfoBackground = styled('div')(({ theme, open }) => ({
	// animation: `${open ? fadeIn : fadeOut} 0.5s ease-in-out -0.3s`,
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	background: 'rgba(0, 0, 0, 0.5)',
	display: open ? 'flex' : 'none',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 3,

	padding: theme.spacing(1),
	[theme.breakpoints.up('sm')]:{
		padding: "5% 10%",
	}
}));

const SubjectInfoContainer = styled('div')(({ theme }) => ({
	...glassmorphismStyle(theme, "level3"),

	display: 'flex',
	flexDirection: 'column',

	borderRadius: '12px',
	width: '100%',
	height: '100%',

	padding: theme.spacing(1),
	gap: theme.spacing(2),
	[theme.breakpoints.up('sm')]:{
		padding: theme.spacing(3),
		gap: theme.spacing(3),
	}
}));

const SubjectInfoBody = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',

	width: "100%",
	height: "100%",

	gap: theme.spacing(2),
	[theme.breakpoints.up('sm')]:{
		gap: theme.spacing(3),
	}
}));

const CorseInfoGraphContainer = styled('div')(() => ({
	width: '100%',
	borderRadius: '16px',
	flexGrow: 1,
}));

function SubjectInfoGraph() {
	const nodes = new Map([
		["n1", { code: "MAC0101", name: "Integração na Universidade e na Profissão" }],
		["n2", { code: "MAC0121", name: "Integração na Universidade e na Profissão" }],
		["n3", { code: "MAC0216", name: "Integração na Universidade e na Profissão" }],
		["n4", { code: "MAC0239", name: "Integração na Universidade e na Profissão" }],
		["n5", { code: "MAE0119", name: "Integração na Universidade e na Profissão" }],
		["n6", { code: "MAT2425", name: "Integração na Universidade e na Profissão" }],
	]);
	const links = new Map([
		["l1", { a: "n1", b: "n2" }],
		["l2", { a: "n1", b: "n3" }],
		["l3", { a: "n4", b: "n1" }],
		["l4", { a: "n5", b: "n4" }],
		["l5", { a: "n6", b: "n1" }],
		["l6", { a: "n5", b: "n6" }],
	]);
	for (const [key, node] of nodes) {
		node.content = (
			<SubjectCard
				subjectCode={node.code}
				subjectName={node.name}
				planetURL="./icons/planeta.png">
			</SubjectCard>
		);
	}

	const theme = useTheme();
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	return (<GraphView nodes={nodes} links={links} root={"n1"} vertical={isMobile} interactive={!isMobile} />);
}

function SubjectInfo() {
	const { subjectInfo, isSubjectInfoModalOpen, closeSubjectInfoModal } = useSubjectInfoContext();

	return (
		<SubjectInfoBackground onClick={closeSubjectInfoModal} open={isSubjectInfoModalOpen}>
			<SubjectInfoContainer onClick={(e) => e.stopPropagation()}>
				<SubjectInfoHeader onClose={closeSubjectInfoModal} name={subjectInfo.name} code={subjectInfo.code} />
				<SubjectInfoBody>
					<SubjectInfoTags tags={subjectInfo.tags} credits={subjectInfo.credits} />
					<SubjectInfoText desc={subjectInfo.desc} />
					<CorseInfoGraphContainer>
						<SubjectInfoGraph />
					</CorseInfoGraphContainer>
					<Stack direction="row" sx={{ display: { xs: 'flex', sm: 'none' } }}>
						{subjectInfo.isPlanned
							? <IconWrapper color="error" Icon={DeleteIcon} sx={{marginLeft: 'auto'}}/>
							: <Button color="primary" size="small" sx={{marginLeft: 'auto'}}> Adicionar </Button> 
						}
					</Stack>
				</SubjectInfoBody>
			</SubjectInfoContainer>
		</SubjectInfoBackground>
	);
}

export default SubjectInfo;
