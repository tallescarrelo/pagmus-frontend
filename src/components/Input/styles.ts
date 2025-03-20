import styled from "styled-components";

type PropsInput = {
  mt?: number;
  mb?: number;
};

export const Container = styled.div<PropsInput>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : "0")};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : "0")};

  @media (max-width: 768px) {
    margin-top: ${({ mt }) => (mt ? `${mt * 0.75}px` : "0")};
    margin-bottom: ${({ mb }) => (mb ? `${mb * 0.75}px` : "0")};
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

export const Label = styled.h1`
  color: #030229;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const InputForm = styled.input`
  width: 100%;
  border-radius: 8px;
  background-color: #f7f7f8;
  padding: 16px;
  border: none;
  outline: none;
  color: #030229;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 400;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 2px #4fcaca;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 12px;
  }
`;

export const ButtonIcon = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 8px;
  padding: 4px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 2px;
  }
`;

export const IconPassword = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.6;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;