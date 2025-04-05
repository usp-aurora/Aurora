import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, useMediaQuery, TextField, Autocomplete, Button, Typography } from '@mui/material';
import { Search, SignalCellularNull } from '@mui/icons-material';
import axios from 'axios';

import Starfield from "../Components/Background/Starfield";

import { SubjectMapProvider } from "../Hooks/useSubjectMapContext";
import GraphView from '../Components/GraphView/GraphView';
import SubjectCard from '../Components/Atoms/Card/SubjectCard';
import HeaderDesktop from '../Components/Header/HeaderDesktop';
import HeaderMobile from '../Components/Header/HeaderMobile';

const AppContainer = styled(Box)(() => ({
	position: "relative",
	width: "100vw",
	height: "100vh",
	overflow: "hidden",
	padding: "16px"
}));

const Background = styled(Starfield)(() => ({
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: -1,
	width: "100%",
	height: "100%",
}));

const HeaderContainer = styled(Box)(({ }) => ({
	position: "relative",
	top: 0,
	zIndex: 1,
	marginBottom: "24px",
}));

const SearchBarContainer = styled(Box)(({ theme }) => ({
	position: "relative",
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
		minWidth: "0",
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

const EmptyGraphContainer = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100%",
	overflow: "hidden",
	marginTop: "20vh"
}));


const Footer = styled(Box)(({ theme }) => ({
	position: "absolute",
	bottom: 0,
	zIndex: 1,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	padding: "16px",
}));


function SubjectInfoGraph({ isMobile, root, nodes, links }) {
	return (<GraphView key={root} nodes={nodes} links={links} root={root} vertical={isMobile} interactive={!isMobile} />);
}

const Home = ({ subjects }) => {
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [data, setData] = useState({ links: [], nodes: [], root: null });

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleSubjectChange = (event, value) => {
		setSelectedSubject(value ? value : null);
	};


	const handleSearchClick = async () => {
		if (selectedSubject) {
			try {
				const subjectSet = new Set(Object.keys(subjects));

				const response = await axios.get(`/api/subject/${selectedSubject[0]}`);

				const formattedNodes = new Map(
					Object.entries(response.data.nodes)
						.filter(([_, subjectCode]) => subjectSet.has(subjectCode))
						.map(([index, subjectCode]) => [
							subjectCode, {
								code: subjectCode,
								content: (
									<SubjectCard
										subjectCode={subjectCode}
									/>
								)
							}
						])
				);

				const formattedLinks = new Map(
					Object.entries(response.data.links)
						.filter(([_, links]) => subjectSet.has(links[0]) && subjectSet.has(links[1]))
						.map(([index, links]) => [
							`l${parseInt(index, 10) + 1}`, { a: links[0], b: links[1] }
						])
				);

				setData({ links: formattedLinks, nodes: formattedNodes, root: selectedSubject[0] });
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
					{isMobile ? <HeaderMobile /> : <HeaderDesktop />}
				</HeaderContainer>
				<SearchBarContainer>
					<StyledAutocomplete
						id="subject-selector"
						options={Object.entries(subjects)}
						size="small"
						value={selectedSubject}
						getOptionLabel={([code, subject]) => `${code} - ${subject.name}`}
						renderInput={(params) =>
							<TextField {...params}
								label="Selecionar matéria"
								variant="outlined" 
								sx={{textAlign: "left"}}
								/>}
						onChange={handleSubjectChange}
						/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSearchClick}
						sx={{
							height: "40px",
							width: "40px",
							borderRadius: "16px",
						}}
					>
						<Search />
					</Button>
				</SearchBarContainer>
				{data.nodes.size > 0 && data.links.size > 0 && data.root ? (
					<SubjectInfoGraph isMobile={isMobile} root={data.root} nodes={data.nodes} links={data.links} />
				) : (
					<EmptyGraphContainer>
						<Typography variant="h6" align="center" sx={{ marginTop: "20px" }}>
							Selecione uma matéria para visualizar a árvore de requisitos. <br/> Matérias sem requisitos cadastrados para o BCC não aparecem no seletor.
						</Typography>
					</EmptyGraphContainer>
				)}
				<Footer>
					<Typography variant="body2" align="center" sx={{ color: "white" }}>
						made with <span style={{ color: "red" }}>❤️</span> at 
						<span style={{ color: "white", textShadow: '0px 0px 16px rgba(255, 255, 255, 0.5)', fontWeight:"600"}}> Aurora </span>
					</Typography>
				</Footer>
			</AppContainer>
		</SubjectMapProvider>
	);
};

export default Home;


