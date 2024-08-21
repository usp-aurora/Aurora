import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ButtonBackgroundSVG } from '../../../assets/button_background.svg';
import { ReactComponent as DownloadIconSVG } from '../../../assets/download_icon.svg';
import { ReactComponent as UploadIconSVG } from '../../../assets/upload_icon.svg';

const ButtonSection = styled.div`
    display: flex;
    gap: 16px;
`;

const ButtonBox = styled.div`
    width: 40px;
    height: 40px;

    cursor: pointer;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonBackground = styled(ButtonBackgroundSVG)`
    position: absolute;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;


const DownloadIcon = styled(DownloadIconSVG)`
    position: absolute;
    z-index: 1;

    top: 6px;
    left: 12px;
    width: 21px;
`;


const UploadIcon = styled(UploadIconSVG)`
    position: absolute;

    z-index: 1;

    width: 21px;
`;




const ImportExportButtons = () => {
    return (
        <ButtonSection>
            <ButtonBox>
                <ButtonBackground />
                <DownloadIcon />
            </ButtonBox>
            <ButtonBox>
                <ButtonBackground />
                <UploadIcon />
            </ButtonBox>
        </ButtonSection>
    );
};

export default ImportExportButtons;