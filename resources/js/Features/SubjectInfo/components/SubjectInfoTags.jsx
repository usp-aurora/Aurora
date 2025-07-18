import { styled } from '@mui/material/styles';

import Chip from '../../../ui/Chip/Chip';

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

const SubjectInfoTags = ({tags, credits}) => {
	return (
		<TagsContainer>
			{tags
				.map(tag => (
					<Chip 
						key={tag.title} 
						variant="contained"
						label={tag.title}
						color={tag.color}
						/>
				))}
			<Chip
				variant="contained"
				color="white"
				label={credits[0] + " + " + credits[1] + " créditos"} />
		</TagsContainer>
	);
};

export default SubjectInfoTags;
