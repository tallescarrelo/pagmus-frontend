import styled from "styled-components";

type PropsButtonLarge = {
  mt?: number;
  mb?: number;
};

export const Container = styled.button<PropsButtonLarge>`
  border-radius: 8px;
  border: none;
  width: 100%;
  padding: 14px;
  background-color: #44ADD4;
  color: #ffffff;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "0")};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "0")};
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #44ADD4;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
  }
`;