import React from 'react';
import Button from '../Atoms/Buttons/Button';

const LoginButton = (props) => {
    return (
		<Button {...props} size="small" href="login"> Entrar </Button>
    );
};

export default LoginButton;