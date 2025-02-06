import { fn } from '@storybook/test';

import AuxiliarCard from './AuxiliarCard';
import AddIcon from "@mui/icons-material/Add";

export default {
  title: 'Auxiliar Card',
  component: AuxiliarCard,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
  
  args: { 
    onClick: fn(),
    title: "",
    text: "",
    icon: "",
    ghost: false,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
