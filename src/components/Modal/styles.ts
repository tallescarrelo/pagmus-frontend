import styled from "styled-components";

export const ModalBackdrop = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  z-index: 1001;
  border-radius: 12px;
  

  max-width: 90%;
  max-height: 80%;
  width: auto;
  height: auto;


  margin-top: env(safe-area-inset-top, 20px);
  margin-bottom: env(safe-area-inset-bottom, 20px);
  margin-left: env(safe-area-inset-left, 20px);
  margin-right: env(safe-area-inset-right, 20px);


  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;


  overflow-y: auto; 
  max-height: 90vh; 


  @media (max-width: 768px) {
    max-width: 90%;
    max-height: 70%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    max-height: 70%;
    padding: 10px;
  }
`;
