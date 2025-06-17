import DeleteIcon from '@mui/icons-material/Delete';
import { Box, CircularProgress, Modal, Stack, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios';

import glassmorphismStyle from "../../styles/glassmorphism";

import Button from '../../ui/Buttons/Button';
import SubjectCard from '../../ui/Card/SubjectCard';
import IconWrapper from '../../ui/Icons/IconWrapper';
import GraphView from './components/GraphView/GraphView';
import SubjectInfoHeader from './components/SubjectInfoHeader';
import SubjectInfoTags from './components/SubjectInfoTags';
import SubjectInfoText from './components/SubjectInfoText';

import { useSubjectInfoContext } from './SubjectInfoContext';
import { useEffect, useState } from 'react';

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

const ProgressIndicatorContainer = styled('div')(() => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100%"
}));

const setGraphData = async (rootSubject, setData) => {
	axios.get(`/api/requirement/${rootSubject.code}`).then(response => {
		const formattedNodes = new Map(
			Object.entries(response.data.nodes)
				.map(([_, subjectCode]) => [
					subjectCode, {
						code: subjectCode,
						content: (
							<SubjectCard
								subjectCode={subjectCode}
							/>
						)
					}
				])
		);

		const formattedLinks = new Map(
			Object.entries(response.data.links)
				.map(([index, links]) => [
					`l${parseInt(index, 10) + 1}`, { a: links[0], b: links[1] }
				])
		);

		setData({ nodes: formattedNodes, links: formattedLinks, root: rootSubject.code });
	});
};

function SubjectInfoGraph({ nodes, links, root }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (<GraphView nodes={nodes} links={links} root={root} vertical={isMobile} interactive={!isMobile} />);
}

function SubjectInfo() {
	const { subjectInfo, isSubjectInfoModalOpen, closeSubjectInfoModal, showSubjectInfo } = useSubjectInfoContext();

	const emptyData = { links: [], nodes: [], root: null };
	const [data, setData] = useState(emptyData);

	useEffect(() => {
		setGraphData(subjectInfo, setData);
	}, [subjectInfo]);

	useEffect(() => {
		if (!isSubjectInfoModalOpen) {
			setData(emptyData);
		}
	}, [isSubjectInfoModalOpen]);

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
						{data.nodes.size > 0 && data.root ?
							<SubjectInfoGraph nodes={data.nodes} links={data.links} root={data.root} />
							:
							<ProgressIndicatorContainer>
								<CircularProgress color='primary' />
							</ProgressIndicatorContainer>
						}
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