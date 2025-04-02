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

function SubjectInfoGraph({ selectedSubject }) {
	const nodes = new Map([
		["n1", { code: "MAC0101"}],
		["n2", { code: "MAC0121"}],
		["n3", { code: "MAC0216"}],
		["n4", { code: "MAC0239"}],
		["n5", { code: "MAE0119"}],
		["n6", { code: "MAC0323"}],
	]);
	const links = new Map([
		["l1", { a: "n1", b: "n2" }],
		["l2", { a: "n1", b: "n3" }],
		["l3", { a: "n4", b: "n1" }],
		["l4", { a: "n5", b: "n4" }],
		["l5", { a: "n6", b: "n1" }],
		["l6", { a: "n5", b: "n6" }],
	]);
	for (const [key, node] of nodes) {
		node.content = (
			<SubjectCard
				subjectCode={node.code}
			/>
		);
	}

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (<GraphView nodes={nodes} links={links} root={selectedSubject || "n1"} vertical={isMobile} interactive={!isMobile} />);
}

const Home = ({ subjects }) => {
	const [selectedSubject, setSelectedSubject] = useState(null);

	const handleSubjectChange = (event, value) => {
		setSelectedSubject(value ? value[0] : null);
	};

	const handleSearchClick = async () => {
		if (selectedSubject) {
			try {
				console.log(selectedSubject)
				const response = await axios.get(`/api/subject/${selectedSubject}`);
			
				console.log(response.data);
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
					<SubjectInfoGraph />
				</SubjectInfoGraphContainer>
				<Footer />
			</MainContainer>
		</SubjectMapProvider>
	);
};

export default Home;
