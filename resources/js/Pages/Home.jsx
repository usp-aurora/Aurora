import React, { useEffect, useMemo, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, useMediaQuery, TextField, Autocomplete, Button } from '@mui/material';
import axios from 'axios';
import { SubjectMapProvider } from "../Hooks/useSubjectMapContext";
import SubjectCard from '../Components/Atoms/Card/SubjectCard';
import GraphView from '../Components/GraphView/GraphView';
import { Search } from '@mui/icons-material';

const MainContainer = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	width: '100vw',
	height: '100vh',
}));

const Header = styled(Box)(() => ({
	height: "100px",
	width: "100%",
	backgroundColor: "red",
}));

const SearchBarContainer = styled(Box)(() => ({
	position: "absolute",
	top: "16px",
	left: "16px",
	width: "33%",
	zIndex: "999",
	display: "flex",
	flexDirection: "row",
	gap: "16px",
	padding: "16px",
	alignItems: "center",
	borderRadius: "8px",
}));

const SubjectInfoGraphContainer = styled(Box)(() => ({
	flex: 1,
	position: "relative",
	display: "flex",
	flexDirection: "column",
}));

const Footer = styled(Box)(() => ({
	height: "100px",
	width: "100%",
	backgroundColor: "red"
}));

function SubjectInfoGraph({ selectedSubject, nodes, links }) {

	console.log("links: ", links);
	console.log("typeof links: ", typeof links);
	console.log("nodes: ", nodes);
	console.log("typeof nodes: ", typeof nodes);

	const nodesM = new Map([
		["n1", { code: "MAC0101" }],
		["n2", { code: "MAC0121" }],
		["n3", { code: "MAC0216" }],
		["n4", { code: "MAC0239" }],
		["n5", { code: "MAE0119" }],
		["n6", { code: "MAC0323" }],
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

	return (<GraphView nodes={nodesM} links={linksM} root={'n1'} vertical={isMobile} interactive={!isMobile} />);
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

				const formattedNodes = Map(Object.entries(response.data.nodes).map(([index, subjectCode]) => [
					subjectCode, {
						code: subjectCode,
						content: (
							<SubjectCard
							subjectCode={subjectCode}
							/>
						)
					}
				]));

				const formattedLinks = Map(Object.entries(response.data.links).map(([index, links]) => [
					`l${index}`, { a: links[0], b: links[1] }
				]));

				setData({ links: formattedLinks, nodes: formattedNodes })
			} catch (error) {
				console.error("Error fetching subject data:", error);
			}
		}
	};

	return (
		<SubjectMapProvider subjectDataMap={subjects}>
			<MainContainer>
				<Header />
				<SubjectInfoGraphContainer>
					<SearchBarContainer>
						<Autocomplete
							options={Object.entries(subjects)}
							getOptionLabel={([code, subject]) => `${code} - ${subject.name}`}
							renderInput={(params) => <TextField {...params} label="Search Subject" variant="outlined" />}
							onChange={handleSubjectChange}
							sx={{ flexGrow: 1 }}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSearchClick}
						>
							<Search />
						</Button>
					</SearchBarContainer>
					<SubjectInfoGraph root={selectedSubject} nodes={data.nodes} links={data.links} />
				</SubjectInfoGraphContainer>
				<Footer />
			</MainContainer>
		</SubjectMapProvider>
	);
};

export default Home;


