import styled from 'styled-components';
import GuestWarning from './GuestWarning';
import { useAuth } from '../../../../Hooks/useAuthContext';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DownloadButton, LoginButton, LogoutButton, ThemeSwitch } from './StyledButtons';

const UserMenuButton = styled.button`
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
    font-size: 18px;
    margin: 0 10px;
    color: ${(props) => (props.$textcolor)};
  }
`;

const DropdownMenu = styled.nav`
  background-color: #ffffff;
  border-radius: 20px;
  position: absolute;
  z-index: 1;
  top: 60px;
  right: 20px;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  transform: ${(props) => (props.$isVisible ? "translateY(0)" : "translateY(-20px)")};
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 16px;
`;

const MenuHeader = styled.h2`
  color: #1A1B23;
  padding: 8px 16px;
  border-bottom: 0.75px solid #BDBDBD;
`;

const MenuItem = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px 0;
  align-items: center;

  h3 {
    color: #1A1B23;
    font-size: 1.25em;
  }
`;

function UserNav({ textColor='black' }) {
  const dropdownRef = useRef(null);
  const { authUser } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevents event bubbling
    setIsDropdownOpen((prevState) => !prevState);
  };
  
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen, handleClickOutside]);
  
  return authUser ? (
    <>
      <UserMenuButton onClick={toggleDropdown} role="button" aria-label="Abrir menu do usuário" $textcolor={textColor}>
        <span>{authUser.name}</span>
        <span>{isDropdownOpen ? "▲" : "▼"}</span>
      </UserMenuButton>

      <DropdownMenu ref={dropdownRef} $isVisible={isDropdownOpen}>
        <MenuHeader>Sua conta</MenuHeader>
        <MenuContent>
          <MenuItem>
            <h3>Previsão de Conclusão</h3> <DownloadButton />
          </MenuItem>
          <MenuItem>
            <h3>Tema:</h3> <ThemeSwitch right={isDarkMode} setRight={setIsDarkMode}/>
          </MenuItem>
          <MenuItem>
            <LogoutButton onClick={() => (window.location.href = "/logout")}>Sair</LogoutButton>
          </MenuItem>
        </MenuContent>
      </DropdownMenu>
    </>
  ) : (
    <>
      <LoginButton onClick={() => (window.location.href = "/login")}>Entrar</LoginButton>
      <GuestWarning />
    </>
  );
}

export default UserNav;