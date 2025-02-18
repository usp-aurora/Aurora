import React from 'react';
import styled from 'styled-components';

const CourseTagComponent = styled.div`
    padding: 0.5em 2em;
    border: 1px solid ${props => props.color};
    border-radius: 50px;
    color: ${props => props.color};
    margin-right: 3%;
`;

const CourseTagText = styled.p`
  color: ${props => props.color};
`

const CourseTag = ({color, name}) => {
  return (
    <CourseTagComponent color={color}>
      <CourseTagText color={color}>{name}</CourseTagText>
    </CourseTagComponent>
  );
};

export default CourseTag;