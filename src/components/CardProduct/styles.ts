import styled from "styled-components";

type PropsDark = {
  darkMode?: boolean;
};

export const Container = styled.div<PropsDark>`
  display: flex;
  width: 224px;
  height: 364px;
  border-radius: 20px;
  background-color: #fff;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 180px;
    height: 300px;
  }
`;

export const Content = styled.div<PropsDark>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const Image = styled.img``;

export const CodeContainer = styled.div`
  display: flex;
  width: 88px;
  height: 22px;
  background-color: #e8fffc;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    width: 70px;
    height: 18px;
    margin-bottom: 6px;
  }
`;

export const Code = styled.p`
  color: #4fcaca;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const MoreInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 136px;
  height: 29px;
  background-color: #4fcaca;
  border-radius: 7px;

  @media (max-width: 768px) {
    width: 110px;
    height: 24px;
  }
`;

export const MoreText = styled.p`
  color: #fff;
  font-size: 12px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const Title = styled.p`
  color: #000000;
  font-size: 16px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;