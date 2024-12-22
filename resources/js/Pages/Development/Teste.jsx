import styled from 'styled-components';
import { useState } from 'react';
import CourseInfo from '../../Components/CourseInfo/CourseInfo';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  background-color: #182538;
`;

const Teste = () => {
  return (
    <AppContainer>
      <CourseInfo isOpen={true} onClose={() => { }}
        title={"Álgebra Booleana e Aplicações no Projeto de Arquitetura de Computadores"}
        code={"MAC0329"}
        tags={[{"color": "#51A1E0", "name":"Obrigatória"}, {"color": "#51A1E0", "name":"Obrigatória"}, {"color": "#51A1E0", "name":"Obrigatória"}]}
        credits={{
          "workCredits": 3,
          "lectureCredits": 2
        }}
        desc={"Conceitos básicos de arquitetura de computadores. Linguagem de montagem e montadores, ligação de código objeto, interface com hardware e com linguagens de alto nível. Interação com o sistema operacional no nível do shell: streams, entrada e saída padInteração com o sistema operacional no nível do shell: streams, entrada e saída padInteração com o sistema operacional no nível do shell: streams, entrada e saída padr"} />
    </AppContainer>
  );
};

export default Teste;