import React, { useEffect, useMemo, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, useMediaQuery, TextField, Autocomplete } from '@mui/material';
import { SubjectMapProvider } from "../Hooks/useSubjectMapContext";
import SubjectCard from '../Components/Atoms/Card/SubjectCard';
import GraphView from '../Components/SubjectInfo/GraphView/GraphView';
import axios from 'axios'; // Import axios for API requests

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
	padding: "16px",
}));

const SubjectInfoGraphContainer = styled(Box)(() => ({
	flex: 1,
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

const Home = ({ groups, initialPlans, subjects, user }) => {
	const [selectedSubject, setSelectedSubject] = useState(null);

	const handleSubjectChange = async (event, newValue) => {
		if (newValue) {
			try {
				await axios.post('/api/update-graph', { subjectCode: newValue.code });
				setSelectedSubject(newValue.code);
			} catch (error) {
				console.error("Error updating graph:", error);
			}
		}
	};

	return (
		<SubjectMapProvider subjectDataMap={subjects}>
			<MainContainer>
				<Header />
				<SearchBarContainer>
					<Autocomplete
						options={subjects}
						getOptionLabel={(option) => option.code}
						renderInput={(params) => <TextField {...params} label="Search Subject" variant="outlined" />}
						onChange={handleSubjectChange}
					/>
				</SearchBarContainer>
				<SubjectInfoGraphContainer>
					<SubjectInfoGraph selectedSubject={selectedSubject} />
				</SubjectInfoGraphContainer>
				<Footer />
			</MainContainer>
		</SubjectMapProvider>
	);
};

export default Home;
