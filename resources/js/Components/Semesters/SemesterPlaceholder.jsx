import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuxiliaryCard from "../Atoms/Card/AuxiliaryCard";
import AddIcon from "@mui/icons-material/Add";
import { useSubjectPickerContext } from '../../Hooks/useSubjectPickerContext';

const SemesterPlaceHolder = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { isSubjectPickerModalOpen, closeSubjectPickerModal, showSubjectPickerModal } = useSubjectPickerContext();

  return (
    <>
      {isLargeScreen 
      ? <AuxiliaryCard text="Arraste uma disciplina" ghost={true} />
      : <AuxiliaryCard Icon={AddIcon} text="Adicionar disciplina" clickable onClick={showSubjectPickerModal}/>}
    </>
  );
};

export default SemesterPlaceHolder;
