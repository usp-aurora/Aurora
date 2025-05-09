import SubjectCard from './SubjectCard';

export default {
  title: 'Atoms/Subject Card',
  component: SubjectCard,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
  
  argTypes: {
    subjectCode: {
      description: 'O código do curso',
      control: 'text',
    },
    subjectName: {
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
    subjectCode: "MAC0105",
    subjectName: "Fundamentos de Matemática para a Computação",
    planetURL: "./public/icons/planeta.png",
    ghost: false
  },
};


export const Card1Line = {
  args: {
    subjectCode: "MAC0105",
    subjectName: "Cálculo 1",
    planetURL: "./public/icons/planeta.png",
    ghost: false
  }
};

export const CardGhost = {
  args: {
    subjectCode: "MAC0105",
    subjectName: "Fundamentos de Matemática para a Computação",
    planetURL: "",
    ghost: "true"
  }
};

