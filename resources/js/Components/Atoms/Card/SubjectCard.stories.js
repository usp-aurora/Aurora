import SubjectCard from './SubjectCard';

export default {
  title: 'Atoms/Subject Card',
  component: SubjectCard,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
  
  argTypes: {
    courseCode: {
      description: 'O código do curso',
      control: 'text',
    },
    courseName: {
      description: 'O nome do curso',
      control: 'text',
    },
    planetURL: {
      description: 'URL do ícone do planeta',
      control: 'text',
    },
    ghost: {
      description: 'Booleano para determinar se o cartão está no modo fantasma',
      control: 'boolean',
    },
  },
};

export const Card2Lines = {
  args: {
    courseCode: "MAC0105",
    courseName: "Fundamentos de Matemática para a Computação",
    planetURL: "./public/icons/planeta.png",
    ghost: false
  },
};


export const Card1Line = {
  args: {
    courseCode: "MAC0105",
    courseName: "Cálculo 1",
    planetURL: "./public/icons/planeta.png",
    ghost: false
  }
};

export const CardGhost = {
  args: {
    courseCode: "MAC0105",
    courseName: "Fundamentos de Matemática para a Computação",
    planetURL: "",
    ghost: "true"
  }
};

