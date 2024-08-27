import React, { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../Atoms/StyledButton';
import CourseTag from '../Atoms/CourseTag';
import Pokeball from '../Atoms/Pokeball';

const CoursePopUpBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  
  position: absolute;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.6);
`;

const CoursePopUpContainer = styled.div `
    display: flex;
    flex-direction: column;
    width: 55vw;
    height: 65vh;
    padding: 1.2%;

    background-color: #E4EEFA;

    clip-path: polygon(
    0px calc(100% - 8px),
    4px calc(100% - 8px),
    4px calc(100% - 4px),
    8px calc(100% - 4px),
    8px 100%,
    calc(100% - 8px) 100%,
    calc(100% - 8px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 8px),
    100% calc(100% - 8px),
    100% 8px,
    calc(100% - 4px) 8px,
    calc(100% - 4px) 4px,
    calc(100% - 8px) 4px,
    calc(100% - 8px) 0px,
    8px 0px,
    8px 4px,
    4px 4px,
    4px 8px,
    0px 8px
  );
`;

const CoursePopUpHeader = styled.div`
  flex: 10;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2%;
`;


const CoursePopUpHeaderInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1%;
`;

const Button = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
`;

const CoursePopUpBody = styled.div`
  flex: 90;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const CourseTags = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2.5%;  
`;

const CourseDesc = styled.div`
  background-color: #FFFFFF;
  padding: 1.5%;
  border-radius: 30px;
  margin-bottom: 2.5%;  
`;

const Tree = styled.div`
  height: 100%;
  width: 100%;  

  background-color: #C2DCF5;
  clip-path: polygon(
    0px calc(100% - 8px),
    4px calc(100% - 8px),
    4px calc(100% - 4px),
    8px calc(100% - 4px),
    8px 100%,
    calc(100% - 8px) 100%,
    calc(100% - 8px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 8px),
    100% calc(100% - 8px),
    100% 8px,
    calc(100% - 4px) 8px,
    calc(100% - 4px) 4px,
    calc(100% - 8px) 4px,
    calc(100% - 8px) 0px,
    8px 0px,
    8px 4px,
    4px 4px,
    4px 8px,
    0px 8px
  );
`;

const TreeHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 2%;
`;

const SearchFieldContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;

  background-color: #FFFFFF;

  clip-path: polygon(
    0px calc(100% - 8px),
    4px calc(100% - 8px),
    4px calc(100% - 4px),
    8px calc(100% - 4px),
    8px 100%,
    calc(100% - 8px) 100%,
    calc(100% - 8px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 8px),
    100% calc(100% - 8px),
    100% 8px,
    calc(100% - 4px) 8px,
    calc(100% - 4px) 4px,
    calc(100% - 8px) 4px,
    calc(100% - 8px) 0px,
    8px 0px,
    8px 4px,
    4px 4px,
    4px 8px,
    0px 8px
  );
`;

const SearchField = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const SearchFieldWithIcon = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

const TreeButtons = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CoursePopUp = ({pokeball, pokemonURL}) => {
  return (
    <CoursePopUpBackground>
      <CoursePopUpContainer>
        <CoursePopUpHeader>

          <Pokeball pokeball={pokeball} pokemonURL={pokemonURL}/>

          <CoursePopUpHeaderInfos>
            <h1>ÁLGEBRA BOOLEANA E APLICAÇÕES NO PROJETO DE ARQUITETURA DE COMPUTADORES</h1>
            <h3>MAC0216</h3>
          </CoursePopUpHeaderInfos>

          <Button>
            <StyledButton>

            </StyledButton>
          </Button>
          
        </CoursePopUpHeader>

        <CoursePopUpBody>

          <CourseTags>
            <CourseTag color={'#095C4D'} name={"Sistemas de Software"}></CourseTag>
            <CourseTag color={'#17538D'} name={"Obrigatória"}></CourseTag>
            <h3>4 + 2 créditos</h3>
          </CourseTags>

          <CourseDesc>
            <p style={{fontSize: "12px"}}>Conceitos básicos de arquitetura de computadores. Linguagem de montagem e montadores, ligação de código objeto, interface com hardware e com linguagens de alto nível. Interação com o sistema operacional no nível do shell: streams, entrada e saída padrão, redirecionamento e pipes. Shell scripts. Gerenciamento de compilação de programas e bibliotecas com ferramentas como make. Modularização de código. Ligação de módulos, estática e dinâmica. Construção de bibliotecas. Técnicas de depuração e teste de programas. Técnicas e ferramentas de controle de versão. Construção de um sistema em uma linguagem procedimental (por exemplo, C). Estudo de uma linguagem dinâmica de script (por exemplo, Python ou Ruby). Introdução aos conceitos de orientação a objetos no âmbito de linguagens dinâmicas ... Ver mais</p>
          </CourseDesc>

          <Tree>
            <TreeHeader>
              <SearchFieldContainer>
                <SearchFieldWithIcon>
                  <svg width="3%" height="3%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "10px"}}>
                    <path d="M8.33326 7.33326H7.80659L7.61993 7.15326C8.41993 6.21993 8.83326 4.9466 8.6066 3.59326C8.29326 1.73993 6.74659 0.259929 4.87993 0.0332621C2.05993 -0.313405 -0.313405 2.05993 0.0332621 4.87993C0.259929 6.74659 1.73993 8.29326 3.59326 8.6066C4.9466 8.83326 6.21993 8.41993 7.15326 7.61993L7.33326 7.80659V8.33326L10.1666 11.1666C10.4399 11.4399 10.8866 11.4399 11.1599 11.1666C11.4333 10.8933 11.4333 10.4466 11.1599 10.1733L8.33326 7.33326ZM4.33326 7.33326C2.67326 7.33326 1.33326 5.99326 1.33326 4.33326C1.33326 2.67326 2.67326 1.33326 4.33326 1.33326C5.99326 1.33326 7.33326 2.67326 7.33326 4.33326C7.33326 5.99326 5.99326 7.33326 4.33326 7.33326Z" fill="#9E9E9E"/>
                  </svg>
                    <SearchField
                      type="text"
                      placeholder="Busca"
                      // value={searchTerm}
                      // onChange={handleSearchChange}
                    />
                </SearchFieldWithIcon>
              </SearchFieldContainer>

              <TreeButtons>
                <StyledButton>

                </StyledButton>

                <StyledButton>

                </StyledButton>
              </TreeButtons>
            </TreeHeader>
          </Tree>

        </CoursePopUpBody>

      </CoursePopUpContainer>
    </CoursePopUpBackground>
  );
};

export default CoursePopUp;