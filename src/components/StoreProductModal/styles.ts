import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;

export const LeftSide = styled.div`
  width: 501px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProductImage = styled.img`
  max-width: 501px;
  max-height: 526px;
  width: 501px;
  height: 526px;
  object-fit: contain;
  border-radius: 4px;
`;
export const WrapperColumn = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  
  gap: 8px;
`;

export const WrapperRow = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`;

export const InfoBox = styled.div`
  background-color: #f7f7f7;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;


export const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const IconImg = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;


export const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 4px;
  gap: 10px;

  a {
    color: #44add4;
    font-size: 14px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ProductTitle = styled.h1`
  font-size: 20px;
  margin: 10px;
  color: #0f172a;
`;

export const ProductCategory = styled.span`
  font-size: 14px;
  color: #666;
  margin: 10px;
`;

export const PromotionButton = styled.button`
  background-color: #44add4;
  border: none;
  color: #fff;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;

  &:hover {
    background-color: #3690b0;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  margin: 0;
`;

export const InfoBoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TotalValue = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #0f172a;
`;

export const Value = styled.span`
  font-family: Manrope;
  font-weight: 800;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0%;
  color: #0f172a;
`;

export const Client = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #0f172a;
`;

export const Payment = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #0f172a;
`;

export const Delivery = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #0f172a;
`;

export const NormalText = styled.span`
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0%;
  color: #64748b;
  
`;

export const LabelText = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0%;
  color: #64748b;
`;

export const RightHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const LabelRight = styled.span`
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748b;

  a {
    color: #44add4;
    text-decoration: none;
  }
`;

interface RangeInputProps {
  percent: string;
}

export const RangeInput = styled.input.attrs<RangeInputProps>(() => ({
  type: "range",
}))<RangeInputProps>`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${({ percent }) =>
    `linear-gradient(to right, #44ADD4 0%, #44ADD4 ${percent}, #fff ${percent}, #fff 100%)`};
  outline: none;
  margin: 10px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: #44ADD4;
    border: 2px solid #44ADD4;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #44ADD4;
    border: 2px solid #44ADD4;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const ValueDisplay = styled.span`
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #64748b;
  margin-top: 8px;
  display: block;
  text-align: center;
`;

export const PromoteButton = styled.button`
  background-color: #44add4;
  border: none;
  color: #fff;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: fit-content;

  &:hover {
    background-color: #3690b0;
  }
`;

export const DescriptionTitle = styled.span`
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #0f172a;
`;