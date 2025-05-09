import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Stack, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import glassmorphismStyle from "../../styles/glassmorphism";

import Button from '../../ui/Buttons/Button';
import SubjectCard from '../../ui/Card/SubjectCard';
import IconWrapper from '../../ui/Icons/IconWrapper';
import GraphView from './components/GraphView/GraphView';
import SubjectInfoHeader from './components/SubjectInfoHeader';
import SubjectInfoTags from './components/SubjectInfoTags';
import SubjectInfoText from './components/SubjectInfoText';

import { useSubjectInfoContext } from './SubjectInfoContext';

const SubjectInfoBackground = styled(Modal)(({ theme }) => ({
	padding: theme.spacing(1),
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
	overflow: "hidden"
}));

function SubjectInfoGraph() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	
	const nodes = new Map([
		["n1", { code: "MAC0101", name: "Integração na Universidade e na Profissão" }],
		["n2", { code: "MAC0121", name: "Integração na Universidade e na Profissão" }],
		["n3", { code: "MAC0216", name: "Integração na Universidade e na Profissão" }],
		["n4", { code: "MAC0239", name: "Integração na Universidade e na Profissão" }],
		["n5", { code: "MAE0119", name: "Integração na Universidade e na Profissão" }],
		["n6", { code: "MAT2454", name: "Integração na Universidade e na Profissão" }],
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

	return (<GraphView nodes={nodes} links={links} root={"n1"} vertical={isMobile} interactive={!isMobile} />);
}

function SubjectInfo() {
	const { subjectInfo, isSubjectInfoModalOpen, closeSubjectInfoModal, showSubjectInfo } = useSubjectInfoContext(); 

	return (
		<SubjectInfoBackground onClose={closeSubjectInfoModal} open={isSubjectInfoModalOpen}>
			<SubjectInfoContainer>
				<SubjectInfoHeader onClose={closeSubjectInfoModal} 
								   name={subjectInfo.name} 
								   code={subjectInfo.code} />
				<SubjectInfoBody>
					<SubjectInfoTags 
						tags={subjectInfo.tags} 
						credits={subjectInfo.credits} />
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