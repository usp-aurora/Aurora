import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar/TopBar'
import CompletionBar from './CompletionBar/CompletionBar'

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 16px;
    padding: 16px 16px 0 16px;
`

const Header = () => {
    return (
        <HeaderContainer>
            <TopBar />
            <CompletionBar />
        </HeaderContainer>
    );
};

export default Header;