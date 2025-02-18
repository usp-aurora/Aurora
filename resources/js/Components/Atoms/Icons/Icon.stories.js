import IconWrapper from './IconWrapper';
import FullscreenIcon from '@mui/icons-material/FullscreenOutlined';

export default {
  title: 'IconWrapper',
  component: IconWrapper,

  parameters: {
    layout: 'centered',
  },
  
  tags: ['docs'],
  
  args: {
    icon: "" 
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