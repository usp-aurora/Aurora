import { Box, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useSubjectMapContext } from "../../Contexts/SubjectMapContext";
import glassmorphismStyle from "../../styles/glassmorphism";
import Planet from "../../Planets/Components/Planet";
import CardContainer from "./Components/CardContainer";
import CardBackgroundBase from "./Components/CardBackgroundBase";

const CardBackground = styled(({ isClickable, hasIcon, performanceMode, ghost, ...props }) => (
    <CardBackgroundBase isClickable={isClickable} hasIcon={hasIcon} ghost={ghost} {...props} />
))(({ theme, ghost, performanceMode}) => ({
    ...(!ghost && glassmorphismStyle(theme, "level2", performanceMode)),
}));

const CardContent = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "8px",
    [theme.breakpoints.up("sm")]: {
        marginBottom: "14px",
    },
}));

const PlanetContainer = styled(Box)(({ theme }) => ({
    width: theme.card.mobile.planetSize,
    height: theme.card.mobile.planetSize,
    marginBottom: "8px",
    [theme.breakpoints.up("sm")]: {
        width: theme.card.desktop.planetSize,
        height: theme.card.desktop.planetSize,
    },
}));

const PlanetWrapper = styled("div")({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
});

const Moon = styled("div")(({ theme, color }) => ({
    width: theme.card.mobile.moonSize,
    height: theme.card.mobile.moonSize,
    position: "absolute",
    left: "-45%",
    top: "45%",
    backgroundColor: theme.palette[color].main,

    borderRadius: "50%",

    [theme.breakpoints.up("sm")]: {
        width: theme.card.desktop.moonSize,
        height: theme.card.desktop.moonSize,
    }
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.neutral.main,

    ...theme.typography.h4,
    lineHeight: "15px",
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h3,
        lineHeight: "26px",
    },
}));

const TextContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
        height: "39px",
    },
}));

const TextWrapper = styled(Box)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    wordBreak: "break-word",
});

const StyledSubjectText = styled(Typography)(({ theme }) => ({
    width: "90px",
    textAlign: "center",
    ...theme.typography.small,
    [theme.breakpoints.up("sm")]: {
        width: "112px",
        ...theme.typography.p,
    },
}));

const SubjectCard = ({
    subjectCode,
    ghost,
    showBadge,
    badgeColor,
    badgeTooltip = "",
    isClickable = true,
    performanceMode = false,
    ...props
}) => {
    const { subjectDataMap } = useSubjectMapContext();
    const planetUrl = "/icons/planeta.png";
    if (subjectDataMap[subjectCode] === undefined) return null;

    isClickable = isClickable && !ghost;

    return (
        <CardContainer isClickable={isClickable} {...props}>
            <CardBackground
                isClickable={isClickable}
                hasIcon={!!planetUrl}
                ghost={ghost}
                performanceMode={performanceMode}
            >
                <CardContent>
					<PlanetWrapper>
						{!!showBadge && (
                            <Tooltip title={badgeTooltip}>
                                <span>
                                    <Moon color={badgeColor}/>
                                </span>
                            </Tooltip>
                        )}
						<PlanetContainer>
							{(!ghost && planetUrl) && <Planet subjectCode={subjectCode} />}
						</PlanetContainer>
                        
					</PlanetWrapper>
                    <StyledTitle component="h3"> {subjectCode} </StyledTitle>
                    <TextContainer>
                        <TextWrapper>
                            <StyledSubjectText component="p">{ subjectDataMap[subjectCode].name }</StyledSubjectText>
                        </TextWrapper>
                    </TextContainer>
                </CardContent>
            </CardBackground>
        </CardContainer>
    );
};

export default SubjectCard;
