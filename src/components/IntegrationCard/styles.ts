import styled from "styled-components";

export const CardContainer = styled.div`
  width: 262px;
  padding: 16px;
  padding-top: 15px;
  gap: 16px;
  border-radius: 8px 0px 0px 0px;
  border: 1px solid #e1e1ee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  opacity: 1;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
    gap: 8px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 1;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  margin-top: 8px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 4px;
  }
`;

export const CardDescription = styled.p`
  font-size: 12px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 232px;
  height: 32px;
  gap: 16px;
  opacity: 1;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    gap: 8px;
  }
`;

export const IconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eeeeee;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

export const ThreeDotsButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #94a3b8;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;