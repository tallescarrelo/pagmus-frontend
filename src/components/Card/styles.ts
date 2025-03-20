import styled from 'styled-components';

export const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 100%;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 12px;
  }
`;

export const Title = styled.h3`
  font-size: 16px;
  color: #344054;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Value = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #101828;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Change = styled.p<{ change?: string }>`
  font-size: 14px;
  color: ${({ change }) => (change && change.startsWith('-') ? '#b54708' : '#1d8f6e')};

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Details = styled.p`
  font-size: 14px;
  color: #667085;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;