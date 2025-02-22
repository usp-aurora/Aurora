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
	msOverflowStyle: 'none',
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
				label={credits[0] + " + " + credits[1] + " créditos"} />
		</TagsContainer>
	);
};

export default CourseInfoTags;
