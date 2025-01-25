import React from 'react';
import styled from 'styled-components';
import CourseTag from '../Atoms/CourseTag';

const TagsContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-start;
	align-items: center;

	overflow-x: auto;
	white-space: nowrap;


	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const CourseInfoTags = ({tags, credits}) => {
	return (
		<TagsContainer>
			{tags
				.map(tag => (
					<CourseTag key={tag.name} color={tag.color} name={tag.name} />
				))}
			<CourseTag
				color="white"
				name={credits["lectureCredits"] + " + " + credits["workCredits"] + " créditos"} />
		</TagsContainer>
	);
};

export default CourseInfoTags;
