import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MandatoryDetails from './Details';
import { styled } from '@mui/material/styles';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const MandatoryText = styled(Typography)({
  fontFamily: 'Rubik',
  fontWeight: 500,
  fontSize: '16px',
  color: 'var(--texto-primario-diurno, #424242)',
});

const FixedIcon = styled(ArrowDropDownIcon)({
  transform: "rotate(360deg)", 
  marginRight: "8px", 
  marginLeft: "8px",

});

const AccordionSummaryStyled = styled(AccordionSummary)({
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
  minHeight: "40px", 
  "&.Mui-expanded": {
    minHeight: "40px", 
  },
});

const FixedContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)", 
});


export default function Elective({ onChangeCriteria, onChangeSubjects }) {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center' 
      }}
    >
       <Accordion 
        disableGutters
        elevation={0}
        square 
        sx={{ width: '848px', borderRadius: '12px', borderWidth: '1px',
          background: 'var(--glass-diurno, #FFFFFF33)',
          border: '1px solid white',
          backdropFilter: 'blur(20px)', overflow: 'hidden' }}>
        <AccordionSummaryStyled
          expandIcon={<ArrowDropDownIcon htmlColor="orange"/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <FixedContainer display="flex" alignItems="center">
            <PanoramaFishEyeIcon htmlColor="orange" />
            <FixedIcon htmlColor="orange"/>
            <MandatoryText>Eletivas</MandatoryText>
          </FixedContainer>
        </AccordionSummaryStyled>
        <AccordionDetails>
          <MandatoryDetails 
            tipo="optativas"
            onChangeCriteria={onChangeCriteria} 
            onChangeSubjects={onChangeSubjects}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
