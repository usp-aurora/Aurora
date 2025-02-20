// cria o subject item com o nome da disciplina
import React from "react";
import { Box, Typography } from "@mui/material";

const SubjectItem = ({ subject }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">{subject}</Typography>
        </Box>
    );
};

export default SubjectItem;