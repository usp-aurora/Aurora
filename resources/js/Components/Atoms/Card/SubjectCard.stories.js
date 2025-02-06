import { fn } from '@storybook/test';

import SubjectCard from './SubjectCard';

export default {
  title: 'Card',
  component: SubjectCard,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  args: { 
    onClick: fn() 
},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Teste = {
  args: {
    courseCode: "MAC9999",
    courseTitle: "Uma matéria com um nome muito grande",
    planetURL: "public/icons/planeta.png",
  },
};
