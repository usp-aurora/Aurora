import React from 'react';
import styled from 'styled-components';
import Pokeball from './Pokeball';

const CardContentCourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  text-align: center;
`;

const CourseTitleParagraph = styled.p`
  margin-top: -2px;
`


const CardContentCourse = ({pokeball, courseCode, courseTitle, pokemonURL}) => {
  return (
    <CardContentCourseContainer>
      <Pokeball pokeball={pokeball} pokemonURL={pokemonURL} />
      <h2>{courseCode}</h2>
      <CourseTitleParagraph>
        {courseTitle}
      </CourseTitleParagraph>
    </CardContentCourseContainer>

  );
};

export default CardContentCourse;