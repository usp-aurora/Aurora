import React, { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../Atoms/StyledButton';
import Droppable from '../Dnd/Droppable';
import SortableCard from '../Dnd/SortableCard';
import {slideIn, slideIn2, slideOut, slideOut2} from '../Atoms/Animations'
import { SortableContext, rectSortingStrategy,} from '@dnd-kit/sortable';
// import { ReactComponent as ThinButtonBlueBackgroundSVG } from '../../assets/ThinButtonBlueBackground.svg';
// import { ReactComponent as AplicarTextIconSVG } from '../../assets/AplicarTextIcon.svg';


const CoursePickerContainer = styled.div`
  width: 40%;
  margin: 1%;
  padding: 20px;

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

const Title = styled.div`
  text-align: left;
  font-size: 32px;  
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1% 1% 3% 0;
`;

const SearchFieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.2%;
  width: 100%;

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

const FilterOpener = styled.button`
  width: 5%;
  background: none;
  border: none;
  cursor: pointer;
`;

const Filter = styled.div`
  display: flex;  
  max-height: ${props => (props.state ? '500px' : '0')}; /* Define o limite de altura */
  animation: ${props => (props.state ? slideIn : slideOut)} 1s ease-in-out ${props => (props.state ? '-0.1s' : '-0.6s')};

  width: 100%;
  height: 196px;

  margin-top: ${props => (props.state ? '1%' : '0')};

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

const FilterOptions = styled.form`
  display: flex;
  justify-content: space-around;
  flex: 80;
  flex-direction: column;
  padding: 2% 2% 2% 4%;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
`;

const FilterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 20;
  flex-direction: column;
  padding-bottom: 2%;
`;

const FilterButtonBox = styled.div`
  width: 104px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  position: relative;
`

// const FilterButtonBackground = styled(ThinButtonBlueBackgroundSVG)`
//   position: absolute;

//   width: 100%;
//   height: 100%;
// `

// const AplicarTextIcon = styled(AplicarTextIconSVG)`
//   position: absolute;

//   width: 80%;
//   height: 80%;
// `

const CategoryContainer = styled.div`
  margin-bottom: 10px;
`;

const CategoryHeader = styled.div`
  cursor: pointer;
`;

const CategoryHeaderInfos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3% 3% 4% 3%;
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 20px;
`;

const NumberAndSign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberCompleted = styled.p`
  font-size: 15px;
  margin-right: 30px;
`;

const CategoryHeaderBackground = styled.div`
  position: relative;
`;

const CoursesGrid = styled.div`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 50px;
  margin: 5px;
  max-height: ${props => (props.expanded ? '500px' : '0')}; /* Define o limite de altura */
  animation: ${props => (props.expanded ? slideIn2 : slideOut2)} 1s ease-in-out ${props => (props.expanded ? '-0.1s' : '-0.6s')};
`;

const CourseCard = styled.div`
  width: 100px;
  height: 100px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Categories = styled.div`
  margin-top: 5%;
`;

const CoursePicker = ({ categories, courseMap, displayCourse, openDisciplinePopUp }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(
    categories.reduce((acc, category) => {
      acc[category.name] = false;
      return acc;
    }, {})
  );

  const [filter, setFilter] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const toggleFilterOptions = () => {
    setFilter(filter ? false : true)
  }


  return (
    <CoursePickerContainer>
      <Droppable id='coursePicker'>
        <Title>
          <span>Adicionar Disciplinas</span>
          <StyledButton onClick={openDisciplinePopUp} background_image={"/assets/a2.png"}>
            <svg width="70%" height="70%" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1071 1.71498L10.1071 0.964982L9.35712 0.964983L6.78502 0.964983L6.03502 0.964983L6.03502 1.71498L6.03502 5.46395L2.28605 5.46395L1.53605 5.46395V6.21395V8.78605V9.53605L2.28605 9.53605L6.03502 9.53605L6.03502 13.285L6.03502 14.035L6.78502 14.035L9.35712 14.035L10.1071 14.035L10.1071 13.285L10.1071 9.53605H13.8561L14.6061 9.53605L14.6061 8.78605V6.21395L14.6061 5.46395L13.8561 5.46395H10.1071L10.1071 1.71498Z" fill="white" stroke="#1B68AE" stroke-width="1.5"/>
            </svg>
          </StyledButton>
        </Title>
        <SearchFieldContainer>
          <SearchFieldWithIcon>
            <svg width="3%" height="3%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "10px"}}>
              <path d="M8.33326 7.33326H7.80659L7.61993 7.15326C8.41993 6.21993 8.83326 4.9466 8.6066 3.59326C8.29326 1.73993 6.74659 0.259929 4.87993 0.0332621C2.05993 -0.313405 -0.313405 2.05993 0.0332621 4.87993C0.259929 6.74659 1.73993 8.29326 3.59326 8.6066C4.9466 8.83326 6.21993 8.41993 7.15326 7.61993L7.33326 7.80659V8.33326L10.1666 11.1666C10.4399 11.4399 10.8866 11.4399 11.1599 11.1666C11.4333 10.8933 11.4333 10.4466 11.1599 10.1733L8.33326 7.33326ZM4.33326 7.33326C2.67326 7.33326 1.33326 5.99326 1.33326 4.33326C1.33326 2.67326 2.67326 1.33326 4.33326 1.33326C5.99326 1.33326 7.33326 2.67326 7.33326 4.33326C7.33326 5.99326 5.99326 7.33326 4.33326 7.33326Z" fill="#9E9E9E"/>
            </svg>
              <SearchField
                type="text"
                placeholder="Busca"
                value={searchTerm}
                onChange={handleSearchChange}
              />
          </SearchFieldWithIcon>
          <FilterOpener onClick={() => toggleFilterOptions()}>
            <svg width="50%" height="50%" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.141069 1.73984C1.48774 3.4665 3.9744 6.6665 3.9744 6.6665V10.6665C3.9744 11.0332 4.2744 11.3332 4.64107 11.3332H5.9744C6.34107 11.3332 6.64107 11.0332 6.64107 10.6665V6.6665C6.64107 6.6665 9.12107 3.4665 10.4677 1.73984C10.8077 1.29984 10.4944 0.666504 9.94107 0.666504H0.667736C0.114403 0.666504 -0.198931 1.29984 0.141069 1.73984Z" 
                    stroke="#9E9E9E" stroke-width="1.5" fill={ filter ? "#FFFFFF" : "#9E9E9E"}/>
            </svg>
          </FilterOpener>
        </SearchFieldContainer>

        <Filter state={filter}>
          <FilterOptions>
              <FilterOption>
                <label style={{marginLeft: "5px"}}>Ordenar por: </label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="radio" id="rTrilha" name="rTrilha"></input>
                <label style={{marginLeft: "5px"}}>Trilha</label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="radio" id="rAlfabetica" name="rAlfabetica"></input>
                <label style={{marginLeft: "5px"}}>A-Z</label>
              </FilterOption>
              
              <FilterOption>
                <label style={{marginLeft: "5px"}}>Oferecimento em semestre: </label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="checkbox" id="cImpar" name="cImpar"></input>
                <label style={{marginLeft: "5px"}}>Ímpar</label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="checkbox" id="cPar" name="cPar"></input>
                <label style={{marginLeft: "5px"}}>Par</label>
              </FilterOption>  

              <FilterOption>
                <label style={{marginLeft: "5px"}}>Dia da semana: </label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="checkbox" id="cSegunda" name="cSegunda"></input>
                <label style={{marginLeft: "5px"}}>Seg</label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="checkbox" id="cTerca" name="cTerca"></input>
                <label style={{marginLeft: "5px"}}>Ter</label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="checkbox" id="cQuarta" name="cQuarta"></input>
                <label style={{marginLeft: "5px"}}>Qua</label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="checkbox" id="cQuinta" name="cQuinta"></input>
                <label style={{marginLeft: "5px"}}>Qui</label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="checkbox" id="cSexta" name="cSexta"></input>
                <label style={{marginLeft: "5px"}}>Sex</label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="checkbox" id="cSabado" name="cSabado"></input>
                <label style={{marginLeft: "5px"}}>Sab</label>
              </FilterOption>
              
              <FilterOption>
                <label style={{marginLeft: "5px"}}>Horário: </label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="time" id="horarioInicio" name="horarioInicio"></input>
                <label style={{marginLeft: "5px"}}>a</label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="time" id="horarioFim" name="horarioFim"></input>
              </FilterOption>
              
              <FilterOption>
                <label style={{marginLeft: "5px"}}>Créditos: </label>
                <input style={{marginLeft: "10px", fontSize: "16px"}} type="number" id="nCreditos" name="nCreditos"></input>
              </FilterOption>
          </FilterOptions>
          <FilterButton>
            <FilterButtonBox>
              {/* <FilterButtonBackground /> */}
              {/* <AplicarTextIcon /> */}
            </FilterButtonBox>
          </FilterButton>
        </Filter>

        <Categories>
          {categories.map((category) => (
            <CategoryContainer key={category.name}>          
              <CategoryHeader onClick={() => toggleCategory(category.name)}>
                  <CategoryHeaderBackground>
                    <CategoryHeaderInfos>
                      <span>{category.name}</span>
                      <NumberAndSign>
                        <NumberCompleted>{category.completed} {category.total ? '/' : '' } {category.total}</NumberCompleted>
                        <span>{expandedCategories[category.name] ? '▼' : '▶'}</span>
                      </NumberAndSign>
                    </CategoryHeaderInfos>
                    <svg width="100%" height="50%" viewBox="0 0 464 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0H456V32V40H8V0Z" fill="#C2DCF5"/>
                      <path d="M4 32H8V36H4V32Z" fill={category.color}/>
                      <path d="M8 36H456V40H8V36Z" fill={category.color}/>
                      <path d="M4 8H8V4H4V8Z" fill="#C2DCF5"/>
                      <path d="M4 8H0V28H4V8Z" fill="#C2DCF5"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M4 8H464V32H456H4V28V8Z" fill="#C2DCF5"/>
                      <path d="M0 32H4V28H0V32Z" fill={category.color}/>
                      <path d="M460 32H456V36H460V32Z" fill="#C2DCF5"/>
                    </svg>
                  </CategoryHeaderBackground>
              </CategoryHeader>
              <CoursesGrid expanded={expandedCategories[category.name]}>
                <SortableContext items={category.courses} strategy={rectSortingStrategy}>            
                  {category.courses
                    .filter((course) =>
                      courseMap.get(course?.id).code.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((course) => (
                      <SortableCard 
                        id={course.id}
                        course={courseMap.get(course?.id)}
                        key={`${course.id}@${category.name}`} 
                        container={category.name}
                        disable={!expandedCategories[category.name]}
                        handleClick={displayCourse}/>
                    ))}
                </SortableContext> 
              </CoursesGrid>
            </CategoryContainer>
          ))}
        </Categories>
      </Droppable>
    </CoursePickerContainer>
  );
};

export default CoursePicker;