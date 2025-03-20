import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: #f7f7f8;
  border-radius: 8px;
  color: #030229;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 14px 42px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 24px;
  }

  &:hover {
    background-color: #eaeaf0;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Icon = styled.img`
  margin-right: 4px;
  width: 16px;
  height: 16px;

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;