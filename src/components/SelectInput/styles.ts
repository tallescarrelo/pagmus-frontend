import styled from "styled-components";

export const Container = styled.select`
  width: 100%;
  padding: 10px 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 10px 0;
  outline: none;
  color: #101828;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: border-color 0.3s ease; 

  &:focus {
    border-color: #4fcaca; 

  @media (max-width: 768px) {
    font-size: 12px; 
    padding: 8px 12px; 
    margin: 8px 0; 
  }
`;

export const Options = styled.option`
  color: #101828;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px; 
  }
`;