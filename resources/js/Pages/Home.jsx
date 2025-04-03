import React, { useEffect, useMemo, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, useMediaQuery, TextField, Autocomplete, Button, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

import Starfield from "../Components/Background/Starfield";

import { SubjectMapProvider } from "../Hooks/useSubjectMapContext";
import GraphView from '../Components/GraphView/GraphView';
import SubjectCard from '../Components/Atoms/Card/SubjectCard';
import Logo from '../Components/Atoms/Logo/Logo';
import glassmorphismStyle from "../styles/glassmorphism";

const AppContainer = styled(Box)(() => ({
	position: "relative",
	width: "100vw",
	height: "100vh",
	overflow: "hidden",
}));

const Background = styled(Starfield)(() => ({
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: -1,
	width: "100%",
	height: "100%",
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
	...glassmorphismStyle(theme, "level2"),
	position: "relative",
	top: 0,
	zIndex: 1,

	width: "calc(100% - 32px)",
	margin: "16px",
	borderRadius: "8px",

	display: "flex",
	alignItems: "center",
	padding: "16px",
}));

const SearchBarContainer = styled(Box)(({ theme }) => ({
	position: "relative",
	left: "16px",
	width: "33%",
	minWidth: "400px",
	zIndex: "999",
	display: "flex",
	flexDirection: "row",
	gap: "16px",
	alignItems: "center",
	borderRadius: "8px",

	[theme.breakpoints.down("sm")]: {
		width: "100%",
		left: "0",
		top: "0",
		borderRadius: "0",
	},
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
	flex: 1, 
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	alignItems: "center",

	"& .MuiOutlinedInput-notchedOutline": {
		borderRadius: "16px",
	},
}));

const Footer = styled(Box)(() => ({
	position: "absolute",
	bottom: "0px",
	width: "100%",

	backgroundColor: "red",
	height: "100px",
}));

function SubjectInfoGraph({ selectedSubject, nodes, links }) {
	console.log("vai funcinoar agora: ", selectedSubject);
	console.log("links: ", links);
	console.log("typeof links: ", typeof links);
	console.log("nodes: ", nodes);
	console.log("typeof nodes: ", typeof nodes);

	const nodesM = new Map([
		["n1", { code: "AAA0001" }],
		["n2", { code: "AAB0001" }],
		["n3", { code: "ABC0001" }],
		["n4", { code: "CCC0001" }],
		["n5", { code: "ABA0001" }],
		["n6", { code: "BAA0001" }],
	]);
	const linksM = new Map([
		["l1", { a: "n1", b: "n2" }],
		["l2", { a: "n1", b: "n3" }],
		["l3", { a: "n4", b: "n1" }],
		["l4", { a: "n5", b: "n4" }],
		["l5", { a: "n6", b: "n1" }],
		["l6", { a: "n5", b: "n6" }],
	]);
	for (const [key, node] of nodesM) {
		node.content = (
			<SubjectCard
				subjectCode={node.code}
			/>
		)
	}

	console.log("linksM: ", linksM);
	console.log("typeof linksM: ", typeof linksM);
	console.log("nodesM: ", nodesM);
	console.log("typeof nodesM: ", typeof nodesM);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (<GraphView nodes={nodes} links={links} root={selectedSubject} vertical={isMobile} interactive={!isMobile} />);
}

const Home = ({ subjects }) => {
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [data, setData] = useState({ links: [], nodes: [] });


	const handleSubjectChange = (event, value) => {
		setSelectedSubject(value ? value[0] : null);
	};

	const handleSearchClick = async () => {
		if (selectedSubject) {
			try {
				const response = await axios.get(`/api/subject/${selectedSubject}`);

				const formattedNodes = new Map(Object.entries(response.data.nodes).map(([index, subjectCode]) => [
					subjectCode, {
						code: subjectCode,
						content: (
							<SubjectCard
								subjectCode={subjectCode}
							/>
						)
					}
				]));

				const formattedLinks = new Map(Object.entries(response.data.links).map(([index, links]) => [
					`l${index + 1}`, { a: links[0], b: links[1] }
				]));

				setData({ links: formattedLinks, nodes: formattedNodes })

				console.log(data);
			} catch (error) {
				console.error("Error fetching subject data:", error);
			}
		}
	};

	return (
		<SubjectMapProvider subjectDataMap={subjects}>
			<AppContainer>
				<Background />
				<HeaderContainer>
					<Logo />
				</HeaderContainer>
				<SearchBarContainer>
					<StyledAutocomplete
						options={Object.entries(subjects)}
						getOptionLabel={([code, subject]) => `${code} - ${subject.name}`}
						renderInput={(params) =>
							<TextField {...params}
								label="Selecionar matéria"
								variant="outlined" />}
						onChange={handleSubjectChange}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSearchClick}
						sx={{
							height: "50px",
							width: "40px !important",
							borderRadius: "16px",
						}}
					>
						<Search />
					</Button>
				</SearchBarContainer>
				{console.log(data.nodes.size, data.links.size)}
				{data.nodes.size > 0 && data.links.size > 0 && (
					<SubjectInfoGraph selectedSubject={selectedSubject} nodes={data.nodes} links={data.links} />
				)}
				{/* <Footer /> */}
			</AppContainer>
		</SubjectMapProvider>
	);
};

export default Home;


