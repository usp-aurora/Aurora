import React from "react";
import { styled } from "@mui/material/styles";
import ButtonCard from "../../Components/Atoms/Card/ButtonCard";
import SubjectCard from "../../Components/Atoms/Card/SubjectCard";

const AppContainer = styled("div")`
    display: flex;
    height: 100vh;
    flex-direction: column;

    align-items: center;
    justify-content: center;
    background-color: #182538;
`;

// =============

const Teste = () => {
    return (
        <AppContainer>
            <SubjectCard 
                courseCode="MAC0110"
                // ghost="true"
                planetURL={"./icons/planeta.png"}
                courseTitle="Introdução à Computação"
                onClick={() => {console.log("hi")}}
            />
        </AppContainer>
    );
};

export default Teste;
