import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MandatoryDetails from './Details';
import { styled } from '@mui/material/styles';

const Text = styled(Typography)({
  fontFamily: 'Rubik',
  fontWeight: 500,
  fontSize: '16px',
  color: 'var(--texto-primario-diurno, #424242)',
});

const AccordionStyled = styled(Accordion)({
  width: '848px',
  padding: "8px 12px",
  border: "2px solid #FFFFFF",
  borderRadius: "12px",
  background: "var(--glass-diurno, #FFFFFF33)",
  overflow: "hidden",
  height: "40px",
  transition: "height 0.3s ease", // 🔥 Suaviza a transição
  "&.Mui-expanded": {
    height: "auto", 
  },
});


const AccordionSummaryStyled = styled(AccordionSummary)({
  display: "flex", 
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  //minHeight: "40px",
  top: "0",
  "&.Mui-expanded": {
    minHeight: "40px",
  },
});

export default function AccordionUsage() {
  return (
    <div>
      <AccordionStyled >
        <AccordionSummaryStyled
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Text component="span">Obrigatórias</Text>
        </AccordionSummaryStyled>
        <AccordionDetails>
          <MandatoryDetails />
        </AccordionDetails>
      </AccordionStyled>
    </div>
  );
}
