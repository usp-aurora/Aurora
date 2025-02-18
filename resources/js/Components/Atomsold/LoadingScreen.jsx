import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full screen height */
  width: 100%;
  color: #555;
`;

function LoadingScreen() {
  return (
    <LoadingContainer>
      <ClipLoader color="#51A1E0" size={50} />
    </LoadingContainer>
  );
}

export default LoadingScreen;
