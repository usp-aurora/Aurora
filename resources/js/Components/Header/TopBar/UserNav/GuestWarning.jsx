import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { CloseButton } from './StyledButtons';
import React, { useState, useEffect} from 'react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: #fff;
  color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #666;
  text-align: left;
`;

function GuestWarning() {
    const [showPopup, setShowPopup] = useState(true); 
    
    function onClose() { setShowPopup(false); }
  
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds
  
      return () => clearTimeout(timer);
    }, [onClose]);
  
    
    if (!showPopup) return null;
  
    return createPortal(
      <Overlay>
        <PopupContainer>
          <Title>Você não está logado.</Title>
          <Message> 
              Suas informações podem ser perdidas ao sair da página. 
              Considere fazer login para garantir que seus dados sejam armazenados com segurança.
          </Message>
          <CloseButton onClick={onClose}>OK</CloseButton>
        </PopupContainer>
      </Overlay>,
      document.body
    );
};

export default GuestWarning;