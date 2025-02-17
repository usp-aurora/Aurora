import styled from "styled-components";
import { createPortal } from "react-dom";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PopupWrapper = styled.div`
  background: #fff;
  color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 320px;
  position: relative;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: #666;
  text-align: left;
`;

const CloseButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

function DragWarningPopup({ isVisible, onClose }) {
  if (!isVisible) return null;

  return createPortal(
    <Overlay>
      <PopupWrapper>
        <Message>
          Atualmente, você está visualizando a grade obrigatória. Por favor, retorne ao modo de planejamento para arrastar cursos.
        </Message>
        <CloseButton onClick={onClose}>OK</CloseButton>
      </PopupWrapper>
    </Overlay>,
    document.body
  );
}

export default DragWarningPopup;
