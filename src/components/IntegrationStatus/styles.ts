import styled from "styled-components";

export const StatusContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
  }
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StatusIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
`;

export const StatusLabel = styled.span`
  font-size: 14px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;