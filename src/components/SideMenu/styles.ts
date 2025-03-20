import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px; 
  background-color: #f9f9f9;
  padding: 0;
  border-right: 1px solid #e1e1ee;

  @media (max-width: 768px) {
    width: 100%; 
    border-right: none; 
    border-bottom: 1px solid #e1e1ee; 
  }
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #64748b;

  &:hover {
    background-color: #0081811a;
  }

  &.active {
    background-color: #0081811a;
    color: #005353;
  }

  @media (max-width: 768px) {
    font-size: 14px; 
    padding: 10px 12px; 
  }
`;

export const MenuLabel = styled.span`
  flex-grow: 1;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 14px; 
`;

export const ArrowIcon = styled.span`
  font-size: 12px;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 10px; 
  }
`;