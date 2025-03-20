import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column; 
  }
`;

export const Header = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const IntegrationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const IntegrationCardWrapper = styled.div`
  flex: 1;
  min-width: 250px;

  @media (max-width: 768px) {
    min-width: 100%; 
  }
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  border-right: 1px solid #e1e1ee;

  @media (max-width: 768px) {
    border-right: none; 
    padding-right: 0; 
    margin-bottom: 16px; 
  }
`;

export const MenuTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 8px; 
  }
`;

export const MenuTitle = styled.h1`
  font-size: 16px;
  color: #334155;
  margin-left: 8px;

  @media (max-width: 768px) {
    font-size: 14px; 
  }
`;

export const GreenLine = styled.div`
  width: 4px;
  height: 18px;
  background-color: #4fcaca;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 3px; 
    height: 14px; 
  }
`;