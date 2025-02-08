import React from 'react';
import styled from 'styled-components';
import UserNav from './UserNav/UserNav'

const TopBarContainer = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;
`;

const UspDexLogo = styled.img`
    width: 224px;
`

const RightBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
`

const TopBar = () => {

    return (
        <TopBarContainer>
            <UspDexLogo src='./logo/LogoUspDex.png'/>
            <RightBox>
               <UserNav />
            </RightBox>
        </TopBarContainer>
    );
};

export default TopBar;