import styled from "styled-components";

type PropsButton = {
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
};

export const Container = styled.button<PropsButton>`
display: flex;
  align-items: center;
  border: none;
  margin-left: 8px;
  padding: 8px 14px;
  border-radius: 16px;
  background-color: ${({ active, backgroundColor }) =>
    active ? "#1E90FF" : backgroundColor || "#44ADD4"};
  color: ${({ color }) => color || "#fff"};
  font-weight: 500;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 12)}px;
  cursor: pointer;
`;

export const IconLeft = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const IconRight = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
`;
