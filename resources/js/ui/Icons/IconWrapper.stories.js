import FullscreenIcon from '@mui/icons-material/FullscreenOutlined';
import IconWrapper from './IconWrapper';

export default {
  title: 'Atoms/IconWrapper',
  component: IconWrapper,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['autodocs'],
  
  argTypes: {
    color: {
			control: "select",
			options: ["primary", "error", 'neutral', "white", "black", "red", "yellow", "orange", "brown", "green", "cyan", "purple", "pink"],
			description: "Define a cor do wrapper",
		},
    icon: {
      control: 'object',
      description: 'Ícone',
    },
  },
};

export const empty = {
  args: {
    icon: ""
  },
};


export const withIcon = {
  args: {
    Icon: FullscreenIcon
  },
};