import React from 'react';
import styled from 'styled-components';

const CourseTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CourseDescription = styled.div`
	max-height: 3lh;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	transition: max-height 0.5s;
`;

const ReadMoreLabel = styled.label`
	cursor: pointer;
	font-size: 1em;
	color: #2A85CD;
	text-decoration: underline;
`;

const ReadMoreCheckbox = styled.input`
	bottom: 0;
	clip: rect(0);
	height: 1px;
	width: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;

	&:checked + ${CourseDescription} {
		-webkit-line-clamp: unset;
		max-height: 100lh;
	}

	&:not(:checked) ~ ${ReadMoreLabel}::after {
		content: "Ver mais";
	}

	&:checked ~ ${ReadMoreLabel}:after {
		content: "Ver menos";
	}
`;

const CourseInfoText = ({ desc }) => {
	return (
		<CourseTextContainer>
			<ReadMoreCheckbox type="checkbox" name="read-more" id="read-more" />
			<CourseDescription>
				<p>{desc}</p>
			</CourseDescription>
			<ReadMoreLabel htmlFor="read-more" />
		</CourseTextContainer>
	);
};

export default CourseInfoText;
