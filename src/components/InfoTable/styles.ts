import styled from "styled-components";

export const InfoTableComponent = styled.div`
  background: white;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 100%;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    width: 48%;
  }

  @media (min-width: 1024px) {
    width: 23%;
  }

  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 12px;
  }
`;

export const InfoTableTitle = styled.div`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

export const InfoTableBox = styled.div<{ color?: string }>`
  background: ${({ color }) => color || "#ff4c4c"};
  height: 10px;
  width: 10px;
  border-radius: 2px;

  @media (max-width: 768px) {
    height: 8px;
    width: 8px;
  }
`;

export const InfoTablePosition = styled(InfoTableBox)`
  background: ${({ color }) => color || "#4fcaca"};
`;

export const InfoTableDescription = styled(InfoTableBox)`
  background: ${({ color }) => color || "#ffc107"};
`;

export const InfoTableResult = styled(InfoTableBox)`
  background: ${({ color }) => color || "#64748b"};
`;