import styled from 'styled-components';
import React, { useState } from 'react';

const BaseButton = styled.button`
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

const LoginButton = styled(BaseButton)`
  background: linear-gradient(135deg, #2c2c2c, #000000);
  color: white;
  margin-left: auto;
`;

const LogoutButton = styled(BaseButton)`
  background: linear-gradient(135deg, #e74c3c, #c0392b); 
  color: white;
`;

const CloseButton = styled(BaseButton)`
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

const ThemeSwitchContainer = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px 0;
  align-items: center;

  h3 {
    color: #1A1B23;
    font-size: 1em;
  }
`;

// Toggle Switch Button
const ToggleSwitch = styled.button`
  border: 1px solid #aaa;
  border-radius: 99px;
  width: 38px;
  height: 18px;
  transition: border-color 0.2s ease;
  cursor: pointer;
  position: relative;
  background: #f5f5f5;

  &:hover {
    border-color: #6f6f6f;
  }
`;

// Toggle Indicator (Thumb)
const ToggleThumb = styled.div`
  height: 18px;
  width: 18px;
  background-color: ${(props) => (props.$isDarkMode ? "#17538d" : "#2a85cd")};
  border-radius: 99px;
  position: absolute;
  left: ${(props) => (props.$isDarkMode ? "calc(38px - 20px)" : "0")};
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.2s ease, left 0.15s ease;
`;

function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeSwitchContainer>
      <h3>Claro</h3>
      <ToggleSwitch onClick={() => setIsDarkMode(!isDarkMode)}>
        <ToggleThumb $isDarkMode={isDarkMode} />
      </ToggleSwitch>
      <h3>Escuro</h3>
    </ThemeSwitchContainer>
  );
}

function DownloadButton() {
  return (
    <button style={{ width: "22px", height: "22px", backgroundColor: "#2A85CD", borderRadius: "99px", border: "none" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z" />
        <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
      </svg>
    </button>
  );
}

export { CloseButton, DownloadButton, LoginButton, LogoutButton, ThemeSwitch };
