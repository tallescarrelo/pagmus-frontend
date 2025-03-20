import styled from "styled-components";

type PropsSeparatorHorizontal = {
  width?: number;
  ml?: number;
  mr?: number;
};

export const Container = styled.div<PropsSeparatorHorizontal>`
  width: ${({ width }) => (width ? `${width}%` : "44%")};
  height: 1px;
  margin-left: ${({ ml }) => (ml ? `${ml}px` : "0")};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : "0")};
  background-color: #03022910;

  @media (max-width: 768px) {
    width: ${({ width }) => (width ? `${width}%` : "80%")}; 
    margin-left: ${({ ml }) => (ml ? `${ml / 2}px` : "0")}; 
    margin-right: ${({ mr }) => (mr ? `${mr / 2}px` : "0")}; 
    background-color: #03022920;
  }
`;