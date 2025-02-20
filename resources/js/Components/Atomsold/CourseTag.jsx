import React from 'react';
import styled from 'styled-components';

const CourseTagComponent = styled.div`
    padding: 5px 30px;
    border: 1px solid ${props => props.color};
    border-radius: 50px;
    color: ${props => props.color};
    margin-right: 3%;
`;

const CourseTag = ({color, name}) => {
  return (
    <CourseTagComponent color={color}>
      <h3>{name}</h3>
    </CourseTagComponent>
  );
};

export default CourseTag;