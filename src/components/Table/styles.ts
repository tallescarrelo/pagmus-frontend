import styled from "styled-components";

type PropsDark = {
  darkMode?: boolean;
};

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  text-align: left;
  border-collapse: separate;

  @media (max-width: 768px) {
    font-size: 12px; 
  }
`;

export const THead = styled.thead<PropsDark>`
  background-color: ${({ darkMode }) => (darkMode ? "#383838" : "#f4f4f4")};
`;

export const TBody = styled.tbody``;

export const TR = styled.tr<PropsDark>`
  background-color: ${({ darkMode }) => (darkMode ? "#383838" : "#f9fafb")};
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555" : "#eaecf0")};
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column; 
    padding: 8px; 
  }
`;

export const TH = styled.th<PropsDark>`
  border-bottom: 1px solid #eaecf0;
  font-size: 9px;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#667085")};
  padding: 10px 18px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 10px; 
    padding: 8px; 
  }
`;

export const TD = styled.td<PropsDark>`
  padding: 30px 20px;
  border-bottom: 1px solid #eaecf0;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#101828")};
  font-size: 10px;
  font-weight: 500;
  border: none;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 12px; 
  }
`;

export const WrapperCheckBox = styled.div<PropsDark>`
  margin-right: 14px;

  @media (max-width: 768px) {
    margin-right: 8px; 
  }
`;

export const ToggleButton = styled.div<{ isActive: boolean }>`
  width: 40px;
  height: 20px;
  background-color: ${(props) => (props.isActive ? "#4fcaca" : "#f2f4f7")};
  border-radius: 20px;
  position: relative;
  transition: background-color 0.3s;

  &::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    left: ${(props) => (props.isActive ? "22px" : "2px")};
    bottom: 1px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s;
  }

  @media (max-width: 768px) {
    width: 32px; 
    height: 16px; 

    &::after {
      width: 14px; 
      height: 14px;
      left: ${(props) => (props.isActive ? "18px" : "2px")}; // Ajusta a posição do círculo
    }
  }
`;