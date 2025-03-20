import styled from "styled-components";

type PropsDark = {
  darkMode?: boolean;
};

export const Container = styled.div<PropsDark>`
  display: flex;
  flex-direction: column;
  width: 100%;
background-color: ${props => props.theme.colors.primary};
`;

export const ContainerButton = styled.div<PropsDark>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.header};
  border-bottom: 1px solid $${props => props.theme.colors.border};

  @media (max-width: 768px) {
    padding: 0.5rem; 
  }
`;

export const ButtonLeftContent = styled.div`
  display: flex;
`;

export const ButtonRightContent = styled.div`
  display: flex;
`;

export const StatusContainer = styled.div<PropsDark>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.625rem 2.25rem;
  background-color: ${props => props.theme.colors.statusBackground};
  border-bottom: 1px solid ${props => props.theme.colors.statusBorder};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem; 
    flex-direction: column; 
    gap: 0.5rem; 
  }
`;

export const StatusWrapper = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 0.5rem;
  }
`;

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
  border-right: 1px solid #eeee;

  @media (max-width: 768px) {
    border-right: none; 
    padding: 0; 
  }
`;

export const Title = styled.p`
  color: #9e9e9e;
  font-size: 0.75rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.625rem; 
  }
`;

export const Value = styled.p<PropsDark>`
  color:${props => props.theme.colors.value};
  font-size: 0.875rem;
  font-weight: 700;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.75rem; 
  }
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MoneyValue = styled.h2`
  color: #44ADD4;
  font-size: 1.25rem;
  font-weight: 500;
  margin-right: 0.625rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const CardStatusContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap; 

  @media (max-width: 768px) {
    justify-content: center; 
    gap: 0.5rem; 
  }
`;

export const CardStatus = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0.5rem;
  width: 20.375rem;
  margin-right: 1rem;
  padding: 1rem 1.875rem;

  @media (max-width: 768px) {
    width: 100%; 
    margin-right: 0; 
    padding: 0.75rem; 
  }
`;

export const TitlePayment = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 1rem; 
  }
`;

export const SubTitlePayment = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: #9e9e9e;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    font-size: 0.75rem; 
    margin-bottom: 0.75rem; 
  }
`;

export const InitialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 0.5rem; 
  }
`;

export const InitialLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SeparatorVertical = styled.div`
  width: 0.25rem;
  height: 1.125rem;
  border-radius: 0.125rem;
  background: #4fcaca;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    width: 0.2rem; 
    height: 0.875rem; 
  }
`;

export const InitialLabel = styled.h3``;

export const FilterContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 0.5rem; 
  }
`;

export const Filter = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;