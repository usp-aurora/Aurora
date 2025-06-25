import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import Planet from '../../../Planets/Components/Planet';

const HeaderContainer = styled('div')(() => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
}));

const HeaderContent = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'center',
	width: '100%',
	gap: theme.spacing(2),
}));

const HeaderIconContainer = styled('div')(({ theme }) => ({
	width: '45px',
	height: '45px',

	[theme.breakpoints.up('sm')]: {
		width: '104px',
		height: '104px',
	},
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
	...theme.typography.h4,
	margin: '0px',
	maxHeight: '3lh',
	overflow: 'hidden',
	display: '-webkit-box',
	WebkitLineClamp: 3,
	WebkitBoxOrient: 'vertical',
	[theme.breakpoints.up('sm')]: {
		...theme.typography.h2,
	}
}));

const SubjectCodeMobile = styled(Typography)(({ theme }) => ({
	...theme.typography.small,
	margin: '0px',
	[theme.breakpoints.up('sm')]: {
		display: 'none',
	}
}));

const SubjectCodeDesktop = styled(Typography)(({ theme }) => ({
	...theme.typography.h4,
	margin: '0px',
	display: 'none',
	[theme.breakpoints.up('sm')]: {
		display: 'block',
	}
}));


const SubjectInfoHeader = ({ onClose, name, code }) => {
	return (
		<HeaderContainer>
			<HeaderContent>
				<Stack alignItems="center">
					<HeaderIconContainer>
						<Planet subjectCode={code}></Planet>
					</HeaderIconContainer>
					<SubjectCodeMobile>{code.toUpperCase()}</SubjectCodeMobile>
				</Stack>
				<Stack gap={1}>
					<HeaderTitle>
						{name.toUpperCase()}
					</HeaderTitle>
					<SubjectCodeDesktop>{code.toUpperCase()}</SubjectCodeDesktop>
				</Stack>
			</HeaderContent>
			<CloseIcon onClick={onClose} sx={{cursor: 'pointer'}} color="white"/>
		</HeaderContainer>
	);
};

export default SubjectInfoHeader;
