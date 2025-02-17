import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import CompletionHeader from "../Atoms/CompletionHeader/CompletionHeader";
import CompletionMetrics from "../Atoms/CompletionHeader/CompletionMetrics";
import Accordion from "../Atoms/Accordion/Accordion";
import CardContainer from "../Atoms/CardContainer/CardContainer";
import SubjectCard from "../Atoms/Card/SubjectCard";

import SubGroup from "./SubGroup";

const GroupContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(1),  

	[theme.breakpoints.up("sm")]: {	
		gap: theme.spacing(2),
	}
}));

const GroupText = styled(Typography)(({ theme }) => ({
    ...theme.typography.small,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.p,
    },
}));

const SubGroupContainer = styled("div")(({ theme, depth }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
}));

const CoursePicker = ({ data }) => {
    return (
		<Accordion
			summary={
				<CompletionHeader
					title={data.titulo}
					color={"red"}
					completed={false}
				/>
			}
		>
			<GroupContainer>
				<CompletionMetrics
					metrics={[
						{
							name: "disciplinas",
							value: "10",
							total: "50",
						},
						{
							name: "blocos",
							value: "9",
							total: "10",
						},
					]}
				/>
				<GroupText>{data.descricao}</GroupText>
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
				<SubGroupContainer>
					{data.subgrupos.map((subgrupo) => (
						<SubGroup depth={1} data={subgrupo} />
					))}
				</SubGroupContainer>
			</GroupContainer>
		</Accordion>
    );
};

export default CoursePicker;
