import { React, useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const CourseTextContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
}));

const CourseDescription = styled(Typography)(({ theme, isOpen }) => ({
	...theme.typography.small,
	...(isOpen ? {} : {
		display: '-webkit-box',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical',
		overflow: 'hidden',
	}),

	margin: 0,
	transition: 'max-height 0.5s',

	[theme.breakpoints.up('sm')]: {
		...theme.typography.p
	},
}));

const ReadMoreButton = styled(Typography)(({ theme }) => ({
	...theme.typography.small,
	userSelect: 'none',
	cursor: 'pointer',
	color: theme.palette.primary.main,

	[theme.breakpoints.up('sm')]: {
		...theme.typography.p
	},
}));

const CourseInfoText = ({ desc }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showReadMoreButton, setShowReadMoreButton] = useState(false);

	const descRef = useRef(null);

	useEffect(() => {
		if(descRef.current){
			setShowReadMoreButton(descRef.current.clientHeight !== descRef.current.scrollHeight);
		}
	}, []);

	return (
		<CourseTextContainer>
			<CourseDescription isOpen={isOpen} ref={descRef}>
				{desc}
			</CourseDescription>
			{showReadMoreButton && (
				<ReadMoreButton onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? "Ver menos" : "Ver mais"}
				</ReadMoreButton>
			)}
		</CourseTextContainer>
	);
};

export default CourseInfoText;
