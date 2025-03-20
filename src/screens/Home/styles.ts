import styled from "styled-components";
type PropsDark = {
  darkMode?: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  border-bottom: 1px solid #efefef;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const ButtonLeftContent = styled.div`
  display: flex;
`;

export const ButtonRightContent = styled.div`
  display: flex;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 36px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eaeaea;

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
`;

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  border-right: 1px solid #eeee;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const Title = styled.p`
  color: #9e9e9e;
  font-size: 12px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const Value = styled.p`
  color: #48626f;
  font-size: 14px;
  font-weight: 700;
  margin-top: 4px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MoneyValue = styled.h2`
  color: #4fcaca;
  font-size: 20px;
  font-weight: 500;
  margin-right: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const CardStatusContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const CardStatus = styled.div<PropsDark>`
  display: flex;
  flex-direction: column;
  background-color: ${({ darkMode }) => (darkMode ? '#1F1F1F' : '#FFFFFF')};
  border-radius: 8px;
  width: 326px;
  margin-right: 16px;
  padding: 16px 30px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
  }
`;

export const TitlePayment = styled.h2<PropsDark>`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.colors.blackLight};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;


export const SubTitlePayment = styled.h3`
  font-size: 12px;
  font-weight: 500;
  color: #9e9e9e;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const InitialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const InitialLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SeparatorVertical = styled.div`
  width: 4px;
  height: 18px;
  border-radius: 2px;
  background: #44ADD4;
  margin-right: 8px;

  @media (max-width: 768px) {
    height: 12px;
  }
`;

export const InitialLabel = styled.h3``;

export const FilterContainer = styled.button`
  display: flex;
  justify-content: space-between;  
  padding: 8px 12px;
  align-items: center;
  border-color: #DCE1E9;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Filter = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #64748b;
  

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const Vector = styled.img`
  width: 8px;
  height: 8px;
  margin-left: 8px;
`;

export const ContainerCardDetail = styled.ul`
  display: grid;
  align-items: flex-start;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  list-style: none;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentCardDetail = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px; 
  }
`;

export const TabInitialLabel = styled.h3<PropsDark>`
  margin-right: 24px;
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#334155')};

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

export const DisabledAll = styled.p`
  color: #4fcaca;
  font-size: 12px;
  font-weight: 500;
  margin-right: 18px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  margin-top: 18px;
  width: 100%;
`;

export const NoRecordContainer =styled.div`
  display: flex;
  justify-content: center;  
  padding: 8px 12px;
  align-items: center;
  width: 100%;
`;


export const NoRecordText = styled.text`
font-family: Inter;
font-weight: 400;
font-size: 10.81px;
line-height: 15.44px;
letter-spacing: 0%;
color: #667085;
`;