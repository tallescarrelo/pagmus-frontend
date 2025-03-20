import styled from "styled-components";

type PropsButton = {
  active?: boolean;
  darkMode?: boolean;
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
        ? "#1F6D4B"
        : "#30B37D"
      : darkMode
      ? "#333333"
      : "#F5F5F5"};
  color: ${({ active }) => (active ? "#FFF" : "#888888")}; 
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease; 

  &:hover {
    filter: brightness(0.9); 
  }

  &:active {
    transform: scale(0.95); 
  }

  svg {
    margin-left: 8px;
    fill: ${({ active, darkMode }) =>
      active
        ? "#FFF" 
        : darkMode
        ? "#CCCCCC" 
        : "#30B37D"}; 
    transition: fill 0.3s ease; 
  }

  @media (max-width: 768px) {
    padding: 6px 12px; 
    font-size: 12px; 

    svg {
      width: 16px; 
      height: 16px;
    }
  }
`;