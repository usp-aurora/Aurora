import styled from 'styled-components';
import { useState } from 'react';
import CoursePopUp from '../../Components/PopUps/CoursePopUp';

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
      <CoursePopUp isOpen={true} onClose={() => { }}
        pokeball_color={"#FF0000"}
        pokemonURL={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"}
        title={"Título Levemente Maior"}
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