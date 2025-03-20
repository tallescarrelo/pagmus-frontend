import styled from "styled-components";

type PropsImportProduct = {
  type?: "product" | "default";
};

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 14px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const ImportProductContainer = styled.div<PropsImportProduct>`
  display: flex;
  width: ${({ type }) => (type === "product" ? "55%" : "100%")};
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

export const Title = styled.h1`
  color: #030229;
  font-family: "Nunito", sans-serif;
  font-size: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const SubTitle = styled.h2`
  color: rgba(1, 13, 28, 0.5);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 10px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  background: #6c6d6c10;
  padding: 6px;

  @media (max-width: 768px) {
    padding: 4px;
  }
`;

export const ButtonTab = styled.button`
  background-color: transparent;
  padding: 8px 28px;
  border-radius: 10px;
  border: none;
  color: #030229;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #4fcaca;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 6px 20px;
    font-size: 10px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  margin-left: 16px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
`;

export const ProductDetailContent = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;

  @media (max-width: 768px) {
    padding: 6px 0;
  }
`;

export const ProductImage = styled.img`
  width: 87px;
  height: 85px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const ProductTitleDetail = styled.div``;

export const ProductTitle = styled.h1`
  color: #1a2530;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ProductDescription = styled.h2`
  color: #707b81;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ProductButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

export const IconCloseContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 4px;
`;

export const ButtonIconCloseCircle = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const IconCloseCircle = styled.img``;