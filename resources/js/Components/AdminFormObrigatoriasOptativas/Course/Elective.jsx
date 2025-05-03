/* Elective is the component for adding information about the elective course group */


import Details from './Details';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Typography, Box } from '@mui/material';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/material/styles';


/* Styling of the text: "Obrigatórias" */
const ElectiveText = styled(Typography)({
  fontFamily: 'Rubik',
  fontWeight: 500,
  fontSize: '16px',
  color: 'var(--texto-primario-diurno, #424242)',
});


/* Styling of the icon: ArrowDropDownIcon */
const FixedIcon = styled(ArrowDropDownIcon)({
  transform: "rotate(360deg)", 
  marginRight: "8px", 
  marginLeft: "8px",
});


/* Styling of the AccordionSummary */
const AccordionSummaryStyled = styled(AccordionSummary)({

  // Styles for the expand icon
  "& .MuiAccordionSummary-expandIconWrapper": {
    transition: "transform 0.3s ease",
    transform: "rotate(270deg)",
  },
  "&.Mui-expanded .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(360deg)", 
  },    

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "848px",
  minHeight: "40px",
  
  // Styles for the AccordionSummary when expanded
  "&.Mui-expanded": {
    minHeight: "40px", 
  },
});


/* Styling for the Accordion text */
const FixedContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)", 
});

/* Styling for the Accordion */
const AccordionStyled = styled(Accordion)({
  width: '848px', 
  border: '1px solid white',
  borderRadius: '12px', 
  borderWidth: '1px',
  background: 'var(--glass-diurno, #FFFFFF33)',
  backdropFilter: 'blur(20px)', 
  overflow: 'hidden'
})


/* Elective component */
const Elective = ({ onChangeCriteria, onChangeSubjects }) => {

  return ( 
    
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', }} >
      
      <AccordionStyled disableGutters elevation={0} square>
        
        <AccordionSummaryStyled expandIcon={<ArrowDropDownIcon htmlColor="orange"/>} aria-controls="panel1-content" id="panel1-header">
          
          <FixedContainer>
            <PanoramaFishEyeIcon htmlColor="orange" />
            <FixedIcon htmlColor="orange"/>
            <ElectiveText>Optativas</ElectiveText>
          </FixedContainer>
        
        </AccordionSummaryStyled>
        
        <AccordionDetails>
          <Details onChangeCriteria={onChangeCriteria} onChangeSubjects={onChangeSubjects}/>
        </AccordionDetails>

      </AccordionStyled>
    </Box>

  );
  
};

export default Elective;
