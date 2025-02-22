import { React, useState, useRef, useEffect, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const CourseTextContainer = styled(Box)(({ }) => ({
	display: 'flex',
	flexDirection: 'column',
}));

const CourseDescription = styled(forwardRef(({ isOpen, ...props }, ref) => (
    <Typography ref={ref} {...props} />
)))(({ theme, isOpen }) => ({
    ...(isOpen ? {} : {
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    }),

    margin: 0,
    transition: 'max-height 0.5s',

	...theme.typography.small,
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

const CourseInfoText = ({ desc, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showReadMoreButton, setShowReadMoreButton] = useState(false);

	const descRef = useRef(null);

	useEffect(() => {
		if(descRef.current){
			setShowReadMoreButton(descRef.current.clientHeight !== descRef.current.scrollHeight);
		}
	}, []);

	return (
		<CourseTextContainer {...props}>
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
