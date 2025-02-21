import { fn } from '@storybook/test';

import SubjectCard from './SubjectCard';

export default {
  title: 'Atoms/Subject Card',
  component: SubjectCard,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
  
  args: { 
    courseCode: "",
    courseTitle: "",
    planetURL: "",
    ghost: false,
    onClick: fn()
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Card2Lines = {
  args: {
    courseCode: "MAC0105",
    courseTitle: "Fundamentos de Matemática para a Computação",
    planetURL: "./public/icons/planeta.png",
    ghost: false
  },
};

export const CardGhost = {
  args: {
    courseCode: "MAC0105",
    courseTitle: "Fundamentos de Matemática para a Computação",
    planetURL: "",
    ghost: "true"
  }
};

export const Card1Line = {
  args: {
    courseCode: "MAC0105",
    courseTitle: "Cálculo 1",
    planetURL: "./public/icons/planeta.png",
    ghost: false
  }
};
