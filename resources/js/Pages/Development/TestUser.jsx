import styled from 'styled-components';
import { createPortal } from 'react-dom';
import React, { useState, useRef, useEffect} from 'react';
import { useAuth } from '../../Hooks/useAuthContext';

const UserContainer = styled.div`
  background-color: #17538D;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

const UserInfo = styled.button`
  background-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  border: none;
  margin-left: auto;

  &:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  span {
    font-weight: 450;
    color: #fff;
    font-size: 18px;
    margin: 0 10px;
  }

  img {
    border-radius: 90px;
  }
`;

const Dropdown = styled.nav`
  background-color: #ffffff;
  border-radius: 20px;
  position: absolute;
  z-index: 1;
  top: 60px;
  right: 20px;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.$active ? "1" : "0")};
  visibility: ${(props) => (props.$active ? "visible" : "hidden")};
  transform: ${(props) => (props.$active ? "translateY(0)" : "translateY(-20px)")};
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`;

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 16px;
`;

const UserMenuHeader = styled.h2`
  color: #1A1B23;
  padding: 8px 16px;
  border-bottom: 0.75px solid #BDBDBD;
`;

const UserMenuOption = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px 0;
  align-items: center;

  h3 {
    color: #1A1B23;
    font-size: 1.25em;
  }
`;

const ToggleButton = styled.button`
  border: 1px solid #aaa;
  border-radius: 99px;
  width: 38px;
  height: 18px;
  transition: border-color 0.2s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    border-color: #6f6f6f;
  }

  & span {
    text-family: sans serif;
  }
`

const Thumb = styled.div`
  height: 18px;
  width: 18px;
  background-color: ${(props) => (props.$toggle ? "#17538d" : "#2a85cd")};
  border-radius: 99px;
  position: absolute;
  left: ${(props) => (props.$toggle ? "calc(38px - 20px)" : "0")};
  top: 50%;
  transform: translateY(-50%);
  transition: backgroud-color 0.1s ease, left 0.15s ease;
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LoginButton = styled(Button)`
  background: linear-gradient(135deg, #2c2c2c, #000000);
  color: white;
  margin-left: auto;
`;

const LogoutButton = styled(Button)`
  background: linear-gradient(135deg, #e74c3c, #c0392b); 
  color: white;
`

// Guest Warning
const CloseButton = styled(Button)`
  margin: 15px auto;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }
`;

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


function GuestWarningPopup() {
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

function ImportButton() {
  return (
    <button style={{ width: "22px", height: "22px", backgroundColor: "#2A85CD", borderRadius: "99px", border: "none" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z" />
        <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
      </svg>
    </button>
  );
}

function ThemeSwitch() {
  const [toggled, setToggled] = useState(true);
  return (
    <UserMenuOption>
      <h3> Claro </h3>
      <ToggleButton onClick={() => setToggled(!toggled)}>
        <Thumb $toggle={toggled} />
      </ToggleButton>
      <h3> Escuro </h3>
    </UserMenuOption>
  );
}

export default function UserDropdown() {
  const dropdownRef = useRef(null);
  const { authUser } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  function toggleUserMenu(event) {
    event.stopPropagation(); // Prevents the event from bubbling up
    setIsUserMenuOpen((prev) => !prev);
  };
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
  
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <UserContainer>
      {authUser ? (
        <>
          <UserInfo onClick={toggleUserMenu}>
            {/* <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg" alt="User avatar" /> */}
            <span> {authUser.name} </span>
            <span> {isUserMenuOpen? '▲' : '▼' }</span>
          </UserInfo>

          <Dropdown ref={dropdownRef} $active={isUserMenuOpen}>
            <UserMenuHeader> Sua conta </UserMenuHeader>
            <UserMenu>
              <UserMenuOption> <h3> Previsão de Conclusão </h3> <ImportButton /> </UserMenuOption>
              <UserMenuOption> <h3> Tema: </h3> <ThemeSwitch /> </UserMenuOption>
              <UserMenuOption> 
                <LogoutButton onClick={() => (location.href = "/logout")}> Sair </LogoutButton>
             </UserMenuOption>
            </UserMenu>
          </Dropdown>
        </>
      ) : (
        <> 
          <LoginButton onClick={() => (location.href = "/login")}> Entrar </LoginButton>
          <GuestWarningPopup />
        </>
      )}
    </UserContainer>
  );
}
