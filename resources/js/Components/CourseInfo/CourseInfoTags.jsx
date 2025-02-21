import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '../Atoms/Chips/Chip';
const TagsContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	justifyContent: 'flex-start',
	alignItems: 'center',
	overflowX: 'auto',
	whiteSpace: 'nowrap',
	'-ms-overflow-style': 'none',
	scrollbarWidth: 'none',
	'&::-webkit-scrollbar': {
		display: 'none',
	},

	gap: theme.spacing(1),
	[theme.breakpoints.up('sm')]: {
		gap: theme.spacing(3),
	},
}));

const CourseInfoTags = ({tags, credits}) => {
	return (
		<TagsContainer>
			{tags
				.map(tag => (
					<Chip key={tag.name} label={tag.name} />
				))}
			<Chip
				color="white"
				label={credits["lectureCredits"] + " + " + credits["workCredits"] + " créditos"} />
		</TagsContainer>
	);
};

export default CourseInfoTags;
