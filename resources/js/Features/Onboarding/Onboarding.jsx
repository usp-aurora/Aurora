import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import welcomeImage from '../../../images/onboarding/welcome.png';
import planYourCourseImage from "../../../images/onboarding/plan_your_course.png";
import followYourProgressImage from '../../../images/onboarding/follow_your_progress.png';
import explorePossibilitiesImage from '../../../images/onboarding/explore_possibilities.png';
import Button from '../../ui/Button/Button';
import Dialog from '../../ui/Dialog/Dialog';

const ContentContainer = styled(Box)(({ theme }) => ({
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	...(theme.typography.p),
	marginBottom: theme.spacing(2),

	[theme.breakpoints.up('sm')]: {
		...(theme.typography.h5),
	},
}));

function WelcomeContent() {
	return (
		<ContentContainer>
			<StyledTypography>
				Seja bem-vindo ao Aurora! Que bom ter você por aqui. Se é sua primeira vez usando a plataforma, não se preocupe — a gente te ajuda. Confira algumas dicas para aproveitar ao máximo todas as funcionalidades.
			</StyledTypography>

			<Box
				component="img"
				src={welcomeImage}
				alt="Logo do Aurora em um fundo com estrelas"
				sx={{
					width: '100%',
					maxHeight: 260,
					objectFit: 'cover',
					borderRadius: 3,
				}}
			/>
		</ContentContainer>
	);
}

function PlanYourCourseContent() {
	return (
		<ContentContainer>
			<StyledTypography>
				Planeje sua grade curricular de forma inteligente e visual. Organize suas disciplinas por semestre e visualize o progresso em tempo real.
			</StyledTypography>

			<Box
				component="img"
				src={planYourCourseImage}
				alt="Interface de planejamento de curso"
				sx={{
					width: '100%',
					maxHeight: 260,
					objectFit: 'cover',
					borderRadius: 3,
				}}
			/>
		</ContentContainer>
	);
}

function FollowYourProgressContent() {
	return (
		<ContentContainer>
			<StyledTypography>
				Acompanhe seu progresso acadêmico com métricas detalhadas. Veja quantos créditos faltam e quais disciplinas ainda precisam ser cursadas.
			</StyledTypography>

			<Box
				component="img"
				src={followYourProgressImage}
				alt="Imagem do acompanhamento de progresso"
				sx={{
					width: '100%',
					maxHeight: 260,
					objectFit: 'cover',
					borderRadius: 3,
				}}
			/>
		</ContentContainer>
	);
}

function ExplorePossibilitiesContent() {
	return (
		<ContentContainer>
			<StyledTypography>
				Explore todas as possibilidades da plataforma. Descubra recursos avançados e aproveite ao máximo sua experiência acadêmica.
			</StyledTypography>

			<Box
				component="img"
				src={explorePossibilitiesImage}
				alt="Imagem da árvore de requisitos de uma matéria"
				sx={{
					width: '100%',
					maxHeight: 260,
					objectFit: 'cover',
					borderRadius: 3,
				}}
			/>
		</ContentContainer>
	);
}

function ProgressBar({ progress, currentContent, contentMax, isMobile }) {
	return (
		<Stack direction="column" sx={{ width: isMobile ? '100%' : '96px' }}>
			<Typography variant="caption" sx={{ display: isMobile ? 'none' : 'block', textAlign: 'center' }}>
				{currentContent + 1} de {contentMax}
			</Typography>
			<LinearProgress
				variant="determinate"
				value={progress}
				sx={{
					height: 8,
					borderRadius: 4,
					'& .MuiLinearProgress-bar': {
						borderRadius: 4,
					}
				}}
			/>
		</Stack>
	);
}

function PrimaryButton({ onClick, children, isMobile }) {
	return (
		<Button
			variant="contained"
			onClick={onClick}
			color="primary"
			size= {isMobile ? "small" : "medium"}
		>
			{children}
		</Button>
	);
}

function SecondaryButton({ onClick, children, isMobile }) {
	return (
		<Button
			variant="contained-secondary"
			onClick={onClick}
			color="primary"
			size= {isMobile ? "small" : "medium"}
		>
			{children}
		</Button>
	);
}


function Onboarding({ show }) {
	const [open, setOpen] = useState(show);
	const [contentNumber, setContentNumber] = useState(0);

	const titles = ["BEM-VINDE", "PLANEJAR SUA GRADE", "ACOMPANHE O PROGRESSO", "EXPLORE POSSIBILIDADES"];
	const contents = [WelcomeContent, PlanYourCourseContent, FollowYourProgressContent, ExplorePossibilitiesContent];

	const isFirst = contentNumber === 0;
	const isLast = contentNumber === contents.length - 1;
	const progress = ((contentNumber + 1) / contents.length) * 100;

	const theme = useTheme();
	const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

	const handleNext = () => {
		if (!isLast) {
			setContentNumber(contentNumber + 1);
		}
	};

	const handlePrevious = () => {
		if (!isFirst) {
			setContentNumber(contentNumber - 1);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const actions = (
		<Stack
			direction={isMobile ? "column-reverse" : "row"}
			spacing={isMobile ? 2 : 0}
			sx={{
				width: '100%',
				justifyContent: isMobile ? 'flex-end' : 'space-between',
				alignItems: isMobile ? 'stretch' : 'end',
			}}
		>
			<ProgressBar progress={progress} currentContent={contentNumber} contentMax={contents.length} isMobile={isMobile}/>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: isMobile ? 'stretch' : 'right',
					gap: isMobile ? 1 : "16px",
					alignItems: isMobile ? "stretch" : 'center',
					width: isMobile ? '100%' : 'auto',
				}}
			>
				<SecondaryButton isMobile={isMobile} onClick={isFirst ? handleClose : handlePrevious}>
					{isFirst ? "Pular" : "Anterior"}
				</SecondaryButton>
				<PrimaryButton isMobile={isMobile} onClick={isLast ? handleClose : handleNext}>
					{isLast ? "Começar" : "Próximo"}
				</PrimaryButton>
			</Box>
		</Stack>
	);

	const CurrentContent = contents[contentNumber];

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			title={titles[contentNumber]}
			content={<CurrentContent />}
			actions={actions}
		/>
	);
}

export default Onboarding;