import styled from "styled-components";
import React from "react";

import ButtonContainer from "./ButtonContainer";

const ButtonIcon = styled.img`
    width: 24px;
    height: 24px;
`

const CloseButton = ({ onClick }) => {
    return (
        <ButtonContainer onClick={onClick}>
            <ButtonIcon src="./icons/close.svg" />
        </ButtonContainer>
    )
}

export default CloseButton;