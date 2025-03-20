import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #eaecf0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-bottom: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const ChartTitle = styled.h3`
  font-size: 18px;
  color: #344054;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`;

export const ChartLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ColorBox = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
  }
`;
