import React from 'react';
import styled from 'styled-components';
import StyledButton from '../Atoms/StyledButton';

const AddDisciplinePopUpBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AddDisciplinePopUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 35vw;
    height: 55vh;
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

const AddDisciplinePopUpHeader = styled.div`
  flex: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddDisciplinePopUpBody = styled.div`
  flex: 90;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const AddDisciplinePopUpBottom = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const AddButton = styled.button`
  background-color: #2a8bdb; /* Blue background similar to the image */
  color: white; /* White text */
  padding: 2% 17%; /* Padding around the text */
  font-size: 14px; /* Font size */
  cursor: pointer; /* Pointer cursor on hover */
  text-align: center; /* Center text */

  border-top: none;
  border-right: none;
  border-bottom: 4px solid #1A1B23; 
  border-left: 4px solid #1A1B23;


  &:active {
    transform: translateY(2px); /* Slightly move down on click */
  }

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

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 20px;
  border: none;
  outline: none;
  margin-top: 15px;

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

const BottomCampos = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Campo = styled.div`
  width: 100%;
`;

const CampoBot = styled.div`
  width: 50%;
`;

const Select = styled.select`
  width: 100%;
  cursor: pointer;
  padding: 10px 10px 10px 20px;
  border: none;
  outline: none;
  margin-top: 15px;

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

const AddDisciplinePopUp = ({isOpen, onClose}) => {
  if (!isOpen) return null;

  return (
    <AddDisciplinePopUpBackground onClick={onClose}>
      <AddDisciplinePopUpContainer onClick={(e) => e.stopPropagation()}>
          <AddDisciplinePopUpHeader>
              <h1>ADICIONAR DISCIPLINA</h1>
              <StyledButton onClick={onClose} background_image={"/assets/botao_vermelho.png"}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5303 5.34908L14.0607 4.81875L13.5303 4.28842L11.7116 2.46967L11.1812 1.93934L10.6509 2.46967L8 5.12059L5.34908 2.46967L4.81875 1.93934L4.28842 2.46967L2.46967 4.28842L1.93934 4.81875L2.46967 5.34908L5.12059 8L2.46967 10.6509L1.93934 11.1812L2.46967 11.7116L4.28842 13.5303L4.81875 14.0607L5.34908 13.5303L8 10.8794L10.6509 13.5303L11.1812 14.0607L11.7116 13.5303L13.5303 11.7116L14.0607 11.1812L13.5303 10.6509L10.8794 8L13.5303 5.34908Z" fill="white" stroke="#A01414" stroke-width="1.5"/>
                </svg>
              </StyledButton>
          </AddDisciplinePopUpHeader>

          <AddDisciplinePopUpBody>
              <Campo>
                <h3>Código</h3>
                <Input type='text' placeholder='Digite aqui...'></Input>
              </Campo>
              <Campo>
                <h3>Nome</h3>
                <Input type='text' placeholder='Digite aqui...'></Input>
              </Campo>

              <BottomCampos>
                <CampoBot style={{paddingRight: "20px"}}>
                  <h3>Créditos-Aula</h3>
                  <Input type='text' placeholder='Digite aqui...'></Input>
                </CampoBot>
                <CampoBot style={{paddingLeft: "20px"}}>
                  <h3>Créditos-Trabalho</h3>
                  <Input type='text' placeholder='Digite aqui...'></Input>
                </CampoBot>
              </BottomCampos>

              <BottomCampos>
                <CampoBot style={{paddingRight: "20px"}}>
                  <h3>Tipo de Disciplina</h3>
                  <Select name="Tipo de Disciplina">
                    <option value="0">Selecione...</option>
                    <option value="1">Ciência de Dados</option>
                    <option value="2">Inteligência Artificial</option>
                    <option value="3">Sistemas de Software</option>
                    <option value="4">Teoria da Computação</option>
                    <option value="5">Optativa de Estatística</option>
                    <option value="6">Optativa de Ciências</option>
                    <option value="7">Outras Optativas Eletivas</option>
                    <option value="8">Optativas Livres</option>
                  </Select>
                </CampoBot>

                <CampoBot style={{paddingLeft: "20px"}}>
                  <h3>Bloco</h3>
                  <Select name="Bloco">
                    <option value="0">Selecione...</option>
                    <option value="1">Ciência de Dados</option>
                    <option value="2">Inteligência Artificial</option>
                    <option value="3">Sistemas de Software</option>
                    <option value="4">Teoria da Computação</option>
                    <option value="5">Optativa de Estatística</option>
                    <option value="6">Optativa de Ciências</option>
                    <option value="7">Outras Optativas Eletivas</option>
                    <option value="8">Optativas Livres</option>
                  </Select>
                </CampoBot>
              </BottomCampos>
          </AddDisciplinePopUpBody>

          <AddDisciplinePopUpBottom>
              <AddButton>
                <h3>Adicionar</h3>
              </AddButton>
          </AddDisciplinePopUpBottom>

      </AddDisciplinePopUpContainer>
    </AddDisciplinePopUpBackground>
  );
};

export default AddDisciplinePopUp;