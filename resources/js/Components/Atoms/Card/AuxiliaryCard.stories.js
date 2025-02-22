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
    isClickable: {
      control: 'boolean',
      description: 'Determina se o card é clicável',
    },
    text: {
      control: 'text',
      description: 'Texto do card',
    },
    Icon: {
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
    isClickable: true,
    text: "Adicionar",
    Icon: AddIcon,
    ghost: false
  },
};

export const CardGhost = {
  args: {
    isClickable: false,
    text: "Arraste uma disciplina",
    ghost: "true"
  },
};
