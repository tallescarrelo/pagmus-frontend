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

export const PageIndicateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; 
    gap: 8px; 
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end; 
  margin-left: auto; 
`;

export const StyledButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? "#008B52" : "#44ADD4")};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#006F3C" : "#B0B0B0")}; 
  }
`;

export const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px; 
  width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;
