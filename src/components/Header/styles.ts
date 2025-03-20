import styled from "styled-components";

type PropsDark = {
  darkMode?: boolean;
};

export const Container = styled.div<PropsDark>`
  display: flex;
  width: 100%;
  padding: 16px 22px;
  background-color:  ${props => props.theme.colors.headerBackground};
  border-bottom: 1px solid  ${props => props.theme.colors.headerBorder};

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

export const Logo = styled.img`
  width: 165px;
  height: 28px;
  display: block;
  margin-right: 13px;
  

  @media (max-width: 768px) {
    width: 50px;
    height: 20px;
    margin-right: 8px;
    
  }
`;

export const SeparatorVertical = styled.div`
  width: 1px;
  height: 100%;
  background-color: #eaeaea;
  margin: 0 10px;

  @media (max-width: 768px) {
    margin: 0 6px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const FunctionalitiesContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
  }
`;

export const ImportsContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

export const ButtonNotify = styled.button<PropsDark>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.notifyBackground};
  border: 1px solid ${props => props.theme.colors.secondaryGray};
  border-radius: 8px;
  padding: 8px 10px;
  margin-right: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 6px 8px;
    margin-right: 4px;
  }
`;

export const IconNofity = styled.img``;

export const WrapperButton = styled.div`
  margin-right: 24px;

  @media (max-width: 768px) {
    margin-right: 12px;
  }
`;

export const Avatar = styled.img`
  width: 28px;
  height: 8px;
  border-radius: 4px;
  margin-right: 18px;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;

export const UserName = styled.p`
  color: #48626f;
  font-size: 12px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #efefef;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;