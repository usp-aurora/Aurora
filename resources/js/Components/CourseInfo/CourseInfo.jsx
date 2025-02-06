import React from 'react';
import styled from 'styled-components';
import { fadeIn, fadeOut } from '../Atoms/Animations'
import glassmorphismStyle from '../../styles/glassmorphism';

import Card from '../Atoms/Card/SubjectCard'
import GraphView from '../GraphView/GraphView';
import CourseInfoHeader from './CourseInfoHeader';
import CourseInfoTags from './CourseInfoTags';
import CourseInfoText from './CourseInfoText';

const CourseInfoBackground = styled.div`
	animation: ${({ open }) => (open ? fadeIn : fadeOut)} 1s ease-in-out -0.3s;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);

	padding: 1em;

	display: ${({ open }) => (open ? "flex" : "none")};
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const CourseInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5%;

	width: 100%;
	height: 100%;
	padding: 2%;

	${glassmorphismStyle}
`;

const CourseInfoBody = styled.div`
	flex: 90;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 2.5%;
`;

const CourseReqsPlaceholder = styled.div`
	width: 100%;

	border-radius: 16px;
	background-color: #18273C;
	flex-grow: 1;

	display: flex;
	align-items: center;
	justify-content: center;
	color:white;
`;

const ActionsButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding: 10px;
`;

const ButtonPlaceholder = styled.div`
	width: 30px;
	height: 30px;
	background-color: red;
`;

function CourseInfoGraph() {
	const nodes = new Map([
		["n1",{code:"MAC0101", name:"Integração na Universidade e na Profissão"}],
		["n2",{code:"MAC0121", name:"Integração na Universidade e na Profissão"}],
		["n3",{code:"MAC0216", name:"Integração na Universidade e na Profissão"}],
		["n4",{code:"MAC0239", name:"Integração na Universidade e na Profissão"}],
		["n5",{code:"MAE0119", name:"Integração na Universidade e na Profissão"}],
		["n6",{code:"MAT2425", name:"Integração na Universidade e na Profissão"}],
	]);
	const links = new Map([
		["l1",{a:"n1", b:"n2"}],
		["l2",{a:"n1", b:"n3"}],
		["l3",{a:"n4", b:"n1"}],
		["l4",{a:"n5", b:"n4"}],
		["l5",{a:"n6", b:"n1"}],
		["l6",{a:"n5", b:"n6"}],
	]);
	for(const [key,node] of nodes) {
		node.content = (
			<Card
				courseCode={node.code}
				courseTitle={node.name}
				planetURL="./icons/planeta.png">
			</Card>
		);
	}
	return (<GraphView nodes={nodes} links={links} root={"n1"} vertical interactive />);
}

function CourseInfo({ isOpen, onClose, title, code, tags, credits, desc }) {
	return (
		<CourseInfoBackground onClick={onClose} open={isOpen}>
			<CourseInfoContainer onClick={(e) => e.stopPropagation()}>
				<CourseInfoHeader onClose={onClose} title={title} code={code} />
				<CourseInfoBody>
					<CourseInfoTags tags={tags} credits={credits} />
					<CourseInfoText desc={desc} />
					<CourseReqsPlaceholder>
						<CourseInfoGraph />
					</CourseReqsPlaceholder>
					<ActionsButtonsContainer>
						<ButtonPlaceholder />
					</ActionsButtonsContainer>
				</CourseInfoBody>
			</CourseInfoContainer>
		</CourseInfoBackground>
	);
}

export default CourseInfo;
