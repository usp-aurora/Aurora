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

const colors = [
	"blue",
	"brown",
	"cyan",
	"green",
	"orange",
	"pink",
	"purple",
	"red",
	"yellow",
];

const seeds = [
	Math.random().toString(36).substring(2, 10),
	Math.random().toString(36).substring(2, 10),
	Math.random().toString(36).substring(2, 10),
	Math.random().toString(36).substring(2, 10),
	Math.random().toString(36).substring(2, 10),
	Math.random().toString(36).substring(2, 10),
	Math.random().toString(36).substring(2, 10),
	Math.random().toString(36).substring(2, 10),
	Math.random().toString(36).substring(2, 10),
]

function PlanetsTest() {
	return (
		<AppContainer>
			<Typography variant="h2">
				Planeta teste
			</Typography>
			<Stack direction="row" spacing={2}>
				{
					colors.map((color, i) => (
						<Box key={i} sx={{ width: "50px" }}>
							<Planet color={color} seed={seeds[i]} />
						</Box>
					))
				}
			</Stack>
			<Box sx={{ width: "100%", overflowX: "auto" }}>
				<Stack
					direction="row"
					spacing={2}
					sx={{
						width: `${colors.length * 500 + (colors.length - 1) * 16}px`, // 16px = 2 * 8px (default spacing unit)
						minWidth: "max-content",
					}}
				>
					{
						colors.map((color, i) => (
							<Box key={i} sx={{ width: "500px" }}>
								<Planet color={color} seed={seeds[i]} />
							</Box>
						))
					}
				</Stack>
			</Box>
		</AppContainer>
	);
}

export default PlanetsTest;