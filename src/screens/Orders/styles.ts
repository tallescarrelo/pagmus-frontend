import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px; 
  }
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: flex-start; 
    gap: 16px; 
  }
`;

export const PageIndicateContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 26px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

export const ButtonContainer = styled.div`
  display: inline-flex; 
  align-items: 
  gap: 8px; 
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 8px; 
    margin-bottom: 8px; 
  }
`;