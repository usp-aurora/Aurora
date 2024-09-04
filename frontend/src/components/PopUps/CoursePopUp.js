import React, { useEffect } from 'react';
import styled from 'styled-components';
import StyledButton from '../Atoms/StyledButton';
import CourseTag from '../Atoms/CourseTag';
import Pokeball from '../Atoms/Pokeball';
import {fadeIn, fadeOut } from '../Atoms/Animations'

const CoursePopUpBackground = styled.div`
  animation: ${props => (props.open ? fadeIn : fadeOut)} 1s ease-in-out -0.3s;
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
  justify-content: space-between;
  margin-bottom: 2%;
`;

const HeaderInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
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

const CoursePopUp = ({isOpen, onClose, pokeball_color, pokemonURL, title, code, tags, credits, desc}) => {
  if (!isOpen) return null;

  return (
    <CoursePopUpBackground onClick={onClose} open={isOpen}>
      <CoursePopUpContainer onClick={(e) => e.stopPropagation()}>
        <CoursePopUpHeader>

          <HeaderInfo>
            <Pokeball pokeball={pokeball_color} pokemonURL={pokemonURL}/>

            <CoursePopUpHeaderInfos>
              <h1>{title.toUpperCase()}</h1>
              <h3>{code.toUpperCase()}</h3>
            </CoursePopUpHeaderInfos>
          </HeaderInfo>

          <Button>
            <StyledButton onClick={onClose} background_image={"/assets/botao_vermelho.png"}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5303 5.34908L14.0607 4.81875L13.5303 4.28842L11.7116 2.46967L11.1812 1.93934L10.6509 2.46967L8 5.12059L5.34908 2.46967L4.81875 1.93934L4.28842 2.46967L2.46967 4.28842L1.93934 4.81875L2.46967 5.34908L5.12059 8L2.46967 10.6509L1.93934 11.1812L2.46967 11.7116L4.28842 13.5303L4.81875 14.0607L5.34908 13.5303L8 10.8794L10.6509 13.5303L11.1812 14.0607L11.7116 13.5303L13.5303 11.7116L14.0607 11.1812L13.5303 10.6509L10.8794 8L13.5303 5.34908Z" fill="white" stroke="#A01414" stroke-width="1.5"/>
              </svg>
            </StyledButton>
          </Button>
          
        </CoursePopUpHeader>

        <CoursePopUpBody>

          <CourseTags>
            {tags
              .map(tag => (
                <CourseTag color={tag.color} name={tag.name} />
              ))}
            <h3>{credits[0]} {credits[1] > 0 ? '+' : ''} {credits[1]} créditos</h3>
          </CourseTags>

          <CourseDesc>
            <p style={{fontSize: "12px"}}>{desc}</p>
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
                <StyledButton background_image={"/assets/a2.png"}>

                </StyledButton>

                <StyledButton background_image={"/assets/a2.png"}>

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