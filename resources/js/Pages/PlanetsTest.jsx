import { Stack, Box, Typography, styled } from "@mui/material";
import Planet from "../Planets/Components/Planet";

const AppContainer = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100vh",
	backgroundColor: "#000",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
}));


function PlanetsTest() {
	return (
		<AppContainer>
			<Typography variant="h2">
				Planeta teste
			</Typography>
			<Box sx={{ width: "40%", height: "40%" }}>
				<Planet />
			</Box>
		</AppContainer>
	);
}

export default PlanetsTest;