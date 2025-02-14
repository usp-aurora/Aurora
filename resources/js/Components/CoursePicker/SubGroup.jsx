import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import CardContainer from "../Atoms/CardContainer/CardContainer";
import SubjectCard from "../Atoms/Card/SubjectCard";

const SubGroupContainer = styled("div")(({ theme, depth }) => ({
    display: "flex",
    flexDirection: "column",

    marginLeft: theme.spacing(depth),
    borderLeft: "1px solid white",
	gap: theme.spacing(1),
    paddingLeft: theme.spacing(1),
	
    [theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(2 * depth),
		gap: theme.spacing(2),
    },
}));

const SubGroupHeader = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
}));

const SubGroupTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h5,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h4,
    },
}));

const SubGroupText = styled(Typography)(({ theme }) => ({
    ...theme.typography.small,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.p,
    },
}));

const SubGroup = ({ depth, data }) => {
    return (
        <SubGroupContainer depth={depth}>
            <SubGroupHeader>
                <SubGroupTitle>{data.titulo}</SubGroupTitle>
                <SubGroupText>99/99 créditos</SubGroupText>
            </SubGroupHeader>
            <SubGroupText>{data.descricao}</SubGroupText>
            <CardContainer>
                {data.materias.map((card) => (
                    <SubjectCard
                        courseCode={card.codigo_materia}
                        courseTitle={card.nome}
                        planetURL="/icons/planeta.png"
                        // onClick={openCourseInfoPopUp}
                    />
                ))}
            </CardContainer>
            {data.subgrupos.map((subgrupo) => (
                <SubGroup depth={depth + 1} data={subgrupo} />
            ))}
        </SubGroupContainer>
    );
};

export default SubGroup;
