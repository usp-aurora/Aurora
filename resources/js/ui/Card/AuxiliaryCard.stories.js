import AddIcon from "@mui/icons-material/Add";
import AuxiliaryCard from './AuxiliaryCard';

export default {
  title: 'Atoms/Auxiliar Card',
  component: AuxiliaryCard,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
  
  argTypes: {
    clickable: {
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
    clickable: true,
    text: "Adicionar",
    Icon: AddIcon,
    ghost: false
  },
};

export const CardGhost = {
  args: {
    clickable: false,
    text: "Arraste uma disciplina",
    ghost: "true"
  },
};
