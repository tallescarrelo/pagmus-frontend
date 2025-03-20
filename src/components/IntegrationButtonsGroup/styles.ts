import styled from "styled-components";

type PropsButton = {
  darkMode?: boolean;
  active?: boolean;
};

export const RoundedButton = styled.button<PropsButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${({ active, darkMode }) =>
    active
      ? darkMode
        ? "#005353"
        : "#005353"
      : darkMode
      ? "#333"
      : "#F2F2F2"};
  color: ${({ active, darkMode }) =>
    active
      ? "#FFF"
      : darkMode
      ? "#CCCCCC"
      : "#888888"};
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    filter: brightness(0.9);
  }

  img {
    margin-left: 8px;
    width: 16px;
    height: 16px;
    display: block;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 8px;

    img {
      width: 14px;
      height: 14px;
    }
  }
`;