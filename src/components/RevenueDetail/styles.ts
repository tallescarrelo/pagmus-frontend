import styled from "styled-components";

type PropsDark = {
  darkMode?: boolean;
};

export const Container = styled.div<PropsDark>`
  display: flex;
  background-color: ${({ darkMode }) => (darkMode ? "#212121" : "#ffffff")};
  border: 1px solid ${({ darkMode }) => (darkMode ? "#212121" : "#f1f1f1")};
  padding: 16px;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: flex-start; 
    gap: 12px; 
    padding: 12px; 
  }
`;

export const Icon = styled.img`
  width: 82px;
  height: 82px;
  background-color: #dedede;
  border-radius: 4px;
  margin-right: 16px;

  @media (max-width: 768px) {
    width: 60px; 
    height: 60px;
    margin-right: 0; 
    margin-bottom: 12px; 
  }
`;

export const DetailContainer = styled.div``;

export const Title = styled.h2`
  margin-bottom: 8px;
  color: #64748b;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px; 
    margin-bottom: 6px; 
  }
`;

export const Value = styled.h3`
  color: #475569;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px; 
    margin-bottom: 8px; 
  }
`;

export const Status = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #008b52;

  @media (max-width: 768px) {
    font-size: 10px; 
  }
`;