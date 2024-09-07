import React from 'react';
import styled from 'styled-components';
// import { ReactComponent as ThinButtonBackgroundSVG } from '../../../Assets/ThinButtonBackground.svg';
// import { ReactComponent as SairTextIconSVG } from '../../../Assets/SairTextIcon.svg';


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

const UserInfoText = styled.h3`
    
`

const LogOutButtonBox = styled.div`
    width: 48px;
    height: 20px;

    cursor: pointer;

    position: relative;
`

// const LogOutButtonBackground = styled(ThinButtonBackgroundSVG)`
//     position: absolute;

//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
// `

// const SairTextIcon = styled(SairTextIconSVG)`
//     position: absolute;

//     top: 17%;
//     left: 17%;

//     width: 70%;
// `


const TopBar = () => {
    const userName = "João das Couves da Silva Santos"

    return (
        <TopBarContainer>
            <UspDexLogo src='./logo/LogoUspDex.png'/>
            <RightBox>
                <UserInfoText>{userName}</UserInfoText>
                <LogOutButtonBox>
                    {/* <LogOutButtonBackground />
                    <SairTextIcon /> */}
                </LogOutButtonBox>
            </RightBox>
        </TopBarContainer>
    );
};

export default TopBar;