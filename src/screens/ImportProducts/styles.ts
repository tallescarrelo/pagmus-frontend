import styled from "styled-components";
export const PageIndicateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
export const TabContainer = styled.div`
  display: flex;
  gap: 16px;
`;
export const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background-color: ${({ active }) => (active ? "#4FCACA" : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "#000000")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4fcaca;
    color: #ffffff;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
`;