import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: "8px",
    [theme.breakpoints.up("sm")]: {
        gap: "16px",
    },
}));


const CardContainer = ({ children }) => {
    return (
		<Container>
			{children}
		</Container>
    );
};

export default CardContainer;
