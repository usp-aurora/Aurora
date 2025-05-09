import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useSubjectPickerContext } from '../../SubjectPicker/SubjectPickerContext';
import AuxiliaryCard from "../../../ui/Card/AuxiliaryCard";

const SubjectPlaceholder = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { showSubjectPickerModal } = useSubjectPickerContext();

  return (
    <>
      {isLargeScreen 
      ? <AuxiliaryCard text="Arraste uma disciplina" ghost={true} />
      : <AuxiliaryCard Icon={AddIcon} text="Adicionar disciplina" clickable onClick={showSubjectPickerModal}/>}
    </>
  );
};

export default SubjectPlaceholder;
