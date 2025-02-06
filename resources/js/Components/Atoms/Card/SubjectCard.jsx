import React from 'react';
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import Planet from '../Planet';
import glassmorphismStyle from '../../../styles/MUI/glassmorphismMUI';

const CardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",

  position: "relative",

  "&:active": {
    transform: "translateY(2px)",
  },

  width: theme.card.mobile.outerWidth,
  height: theme.card.mobile.outerHeight,
  [theme.breakpoints.up("sm")]: {
      width: theme.card.desktop.outerWidth,
      height: theme.card.desktop.outerHeight,
  },
}));


const CardBackground = styled(Button)(({ theme, ghost }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  
  backgroundColor: ghost ? "transparent" : theme.palette.primary.main,
  
  width: theme.card.mobile.innerWidth,
  height: theme.card.mobile.innerHeight,
  
  textTransform: "none",

  borderRadius: theme.card.desktop.borderRadius,
  border: ghost ? `2px dashed ${theme.palette.neutral.main}` : "none",
  
  transition: "background-color 0.3s ease",
  "&:hover": {
      backgroundColor: ghost ? "transparent" : theme.palette.primary.dark,
  },
  
  [theme.breakpoints.up("sm")]: {
      width: theme.card.desktop.innerWidth,
      height: theme.card.desktop.innerHeight,
      borderRadius: theme.card.desktop.borderRadius,
      fontSize: theme.typography.p.fontSize
  },

  ...glassmorphismStyle(theme),
}));


const CardContent = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",

  textAlign: "center",

  transform: "translateY(-10px)",
}));

const PlanetContainer = styled("div")(({ theme }) => ({
  width: theme.card.mobile.planetSize,
  height: theme.card.mobile.planetSize,
  marginBottom: "0.5rem",
  
  [theme.breakpoints.up("sm")]: {
      width: theme.card.desktop.planetSize,
      height: theme.card.desktop.planetSize,
  }
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral.main,
  fontSize: theme.typography.h4.fontSize,
  lineHeight: theme.typography.h4.lineHeight,
  
  [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h3.fontSize,
      lineHeight: theme.typography.h3.lineHeight,
  }
}));

const StyledCourseText = styled(Typography)(({theme}) => ({
  fontSize: theme.typography.small.fontSize,

  [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.p.fontSize
  }
}));

const truncateText = (text, maxLength) => {
  if(!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
}

const SubjectCard = ({courseCode, courseTitle, planetURL, ghost, onClick}) => {
  return (
    <CardContainer onClick={() => onClick(courseCode)}>
      <CardBackground ghost={ghost}>
        <CardContent>
            <PlanetContainer>
              {planetURL && 
                <Planet src={planetURL}/>
              }
            </PlanetContainer>
          <StyledTitle> {courseCode} </StyledTitle>
          <StyledCourseText component="p">{truncateText(courseTitle, 25)}</StyledCourseText>
        </CardContent>
      </CardBackground>
    </CardContainer>
  );
};

export default SubjectCard;