import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: 24px;
  width: 100%;
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Value = styled.span`
  font-size: 2rem;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

