import { fn } from '@storybook/test';

import AuxiliarCard from './AuxiliarCard';
import AddIcon from "@mui/icons-material/Add";

export default {
  title: 'Atoms/Auxiliar Card',
  component: AuxiliarCard,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
  
  argTypes: {
    text: {
      control: 'text',
      description: 'Texto do card',
    },
    icon: {
      control: 'object',
      description: '(opcional) Ícone do card',
    },
    ghost: {
      control: 'boolean',
      description: 'Determina se o card está no modo fantasma (bordas pontilhadas e sem cor)',
    },
  },
};

export const Card = {
  args: {
    text: "Adicionar",
    icon: AddIcon,
    ghost: false
  },
};

export const CardGhost = {
  args: {
    text: "Arraste uma disciplina",
    ghost: "true"
  },
};
