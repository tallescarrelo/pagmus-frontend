import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

export const GraphCardContainer = styled.div`
  background: white;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 23%;
  margin-bottom: 16px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 48%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
`;

export const GraphTitle = styled.h3`
  font-size: 16px;
  color: #344054;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const GraphValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #101828;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const GraphDetails = styled.p`
  font-size: 14px;
  color: #667085;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;