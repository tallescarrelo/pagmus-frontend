import styled from "styled-components";

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
  }
`;

export const IntegrationButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 14px;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  background-color: #fbbf24;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #eab308;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

export const ButtonIcon = styled.img`
  width: 16px;
  height: 16px;

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;