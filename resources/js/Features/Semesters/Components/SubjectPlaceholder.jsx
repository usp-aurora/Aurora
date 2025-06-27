import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useSubjectPickerContext } from '../../SubjectPicker/SubjectPickerContext';
import AuxiliaryCard from "../../../ui/Card/AuxiliaryCard";

const SubjectPlaceholder = ({ semesterId }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { showSubjectPickerModal, setSelectedSemesterMobile } = useSubjectPickerContext();

  function handleClick() {
    setSelectedSemesterMobile(semesterId);
    showSubjectPickerModal();
  }

  return (
    <>
      {isLargeScreen
        ? <AuxiliaryCard text="Arraste uma disciplina" ghost={true} />
        : <AuxiliaryCard Icon={AddIcon} text="Adicionar disciplina" clickable onClick={handleClick} />}
    </>
  );
};

export default SubjectPlaceholder;
