import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuxiliarCard from "../Atoms/Card/AuxiliarCard";
import AddIcon from "@mui/icons-material/Add";

const SemesterPlaceHolder = ({ openMenu }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {isLargeScreen ? (
        <AuxiliarCard text="Arraste uma disciplina" ghost={true} sx={{ pointerEvents: "none" }} />
      ) : (
        <AuxiliarCard icon={AddIcon} />
      )}
    </>
  );
};

export default SemesterPlaceHolder;
