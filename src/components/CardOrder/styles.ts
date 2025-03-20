import styled from "styled-components";

type PropsCard = {
  widthCard?: number;
};

export const Container = styled.div<PropsCard>`
  display: flex;
  flex-direction: column;
  width: ${({ widthCard }) => (widthCard ? `${widthCard}%` : "16%")};
  padding: 16px;
  border: 1px solid #d1d7e0;
  border-radius: 8px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    width: 100%; 
    padding: 12px; 
  }
`;

export const Title = styled.h4`
  color: #64748b;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px; 
  }
`;

export const Value = styled.h3`
  margin-top: 4px;
  color: #475569;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 16px; 
    margin-top: 2px; 
  }
`;