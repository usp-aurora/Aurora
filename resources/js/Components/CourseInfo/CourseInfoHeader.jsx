import React from 'react';
import styled from 'styled-components';
import Planet from '../Atoms/Planet';
import CloseButton from '../Atoms/Buttons/CloseButton';

const HeaderContainer = styled.div`
	flex: 10;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const HeaderContent = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	gap: 1em;

	overflow: hidden;
`;

const HeaderIconAndCode = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5em;
`;

const HeaderIconContainer = styled.div`
	width: 45px;
	height: 45px;
`

const HeaderTitle = styled.h1`
	max-height: 3lh;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
`

const CloseButtonContainer = styled.div`
	display: flex;
	align-items: flex-start;
	height: 100%;
`;

const CourseInfoHeader = ({ onClose, title, code }) => {
	return (
		<HeaderContainer>
			<HeaderContent>
				<HeaderIconAndCode>
					<HeaderIconContainer>
						<Planet src="./icons/planeta.png"></Planet>
					</HeaderIconContainer>
					<p>{code.toUpperCase()}</p>
				</HeaderIconAndCode>
				<HeaderTitle>{title.toUpperCase()}</HeaderTitle>
			</HeaderContent>
			<CloseButtonContainer>
				<CloseButton onClick={onClose} />
			</CloseButtonContainer>
		</HeaderContainer>
	);
};

export default CourseInfoHeader;
