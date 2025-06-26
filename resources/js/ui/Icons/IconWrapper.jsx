import { Box, Tooltip } from '@mui/material';
import { styled } from "@mui/material/styles";

import clickEffect from '../../styles/animations/clickEffect';

const IconContainer = styled(Box)(({ color, disabled, theme }) => ({
    ...clickEffect,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: disabled ? theme.palette.grey[400] : theme.palette[color].main,
    color: disabled ? theme.palette.grey[600] : theme.palette[color].contrastText,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    transition: 'background 0.2s',
    [theme.breakpoints.up('sm')]: {
        width: 40,
        height: 40,
    },
}));

const IconWrapper = ({ Icon, toolTipText="", disabled, color = "primary", onClick, ...props }) => {
    const handleClick = e => {
        if (onClick) onClick(e);
        e.currentTarget.blur(); // immediately remove focus
    };

    return (
        <Tooltip title={toolTipText}>
            <span>
                <IconContainer
                    tabIndex={0}
                    color={color}
                    onClick={handleClick}
                    disabled={disabled}
                    {...props}
                >

                    {Icon && <Icon />}
                </IconContainer>
            </span>
        </Tooltip>
    );
};

export default IconWrapper;