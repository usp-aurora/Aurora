import { fn } from '@storybook/test';

import { ThemeProvider } from '@mui/material/styles';
import ButtonCard from './ButtonCard';
import AddIcon from "@mui/icons-material/Add";

export default {
  title: 'ButtonCard',
  component: ButtonCard,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
  
  args: { 
    onClick: fn(),
    title: "",
    text: "Adicionar",
    icon: AddIcon,
    ghost: false,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Adicionar = {
  args: {
    text: "Adicionar",
    icon: AddIcon,
    ghost: true
  },
};
