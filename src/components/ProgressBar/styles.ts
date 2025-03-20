import styled, { css } from "styled-components";
import { PropsProgressBar } from "./types";

type PropsDark = {
  darkMode?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 8px; 
  }
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: flex-start;
    gap: 8px; 
  }
`;

export const ProgressText = styled.span<PropsDark>`
  color: ${({ darkMode }) => (darkMode ? "#ffffff" : "#000000")};
  margin-bottom: 6px;
  font-weight: 400;
  font-size: 12px;

  @media (max-width: 768px) {
    font-size: 10px; 
    margin-bottom: 4px; 
  }
`;

export const ProgressBarValue = styled.h3<PropsProgressBar>`
  font-size: 12px;
  font-weight: 400;
  ${({ type }) =>
    type === "ticket" &&
    css`
      color: #ffb200;
    `};
  ${({ type }) =>
    type === "pix" &&
    css`
      color: #02a0fc;
    `};
  ${({ type }) =>
    type === "creditCard" &&
    css`
      color: #4339f2;
    `};

  @media (max-width: 768px) {
    font-size: 10px; 
  }
`;

export const Progress = styled.div<PropsProgressBar>`
  width: 100%;
  height: 8px;
  transition: width 0.3s ease-in-out;
  border-radius: 8px;
  margin-bottom: 24px;
  ${({ type }) =>
    type === "ticket" &&
    css`
      background-color: #ffb200;
    `};
  ${({ type }) =>
    type === "pix" &&
    css`
      background-color: #02a0fc;
    `};
  ${({ type }) =>
    type === "creditCard" &&
    css`
      background-color: #4339f2;
    `};

  @media (max-width: 768px) {
    height: 6px; 
    margin-bottom: 16px; 
  }
`;