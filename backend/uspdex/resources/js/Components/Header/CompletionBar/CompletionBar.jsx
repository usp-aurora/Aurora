import React from 'react';
import styled from 'styled-components';
import CourseProgress from './CourseProgress'
import CourseBadges from './CourseBadges'
import ImportExportButtons from './ImportExportButtons'

const CompletionBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 112px;

  padding-left: 16px;
  padding-right: 16px;


  background-color: var(--primary-color-100);

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

const CompletionBar = () => {
  return (
    <CompletionBarContainer>
      <CourseProgress />
      <CourseBadges />
      <ImportExportButtons />
    </CompletionBarContainer>
  );
};

export default CompletionBar;