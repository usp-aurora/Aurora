import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Modal, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Background from "../Background/HomeBackground";
import SubjectList from "./Pieces/SubjectList";
import { useSubjectPickerContext } from '../../Hooks/useSubjectPickerContext';

const ModalContainer = styled(Modal)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.spacing(2),

    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
}));

const HeaderContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    textTransform: "uppercase",

    ...theme.typography.h4
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
    display: "block",
    color: theme.palette.white.main,
    cursor: "pointer"
}));

const GroupContainers = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    paddingBottom: "100vh",
    overflowY: "auto",
    gap: theme.spacing(2),

    borderRadius: "12px",
}));

function SubjectPicker({ subjectDataMap, plannedSubjects, data }) {
    const { isSubjectPickerModalOpen, closeSubjectPickerModal, showSubjectPickerModal } = useSubjectPickerContext();

    return (
        <ModalContainer
			open={isSubjectPickerModalOpen}
			onClose={closeSubjectPickerModal}>
            <>
                <Background />
                <HeaderContainer>
                    <StyledTitle>Adicionar disciplina</StyledTitle>
                    <StyledCloseIcon onClick={closeSubjectPickerModal} />
                </HeaderContainer>
                <SubjectList subjectDataMap={subjectDataMap} plannedSubjects={plannedSubjects} data={data} />
            </>
        </ModalContainer>
    );
};

export default SubjectPicker;
