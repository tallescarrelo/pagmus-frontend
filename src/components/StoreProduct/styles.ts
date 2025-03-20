import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

export const Image = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 10px;
`;

export const ProductName = styled.h2`
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const RangeInput = styled.input`
  width: 215px;
  height: 8px;
  border-radius: 4px;
  background: #44add4;
  appearance: none;
  outline: none;
  margin: 5px 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    background: white;
    border: 2px solid #44add4;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: white;
    border: 2px solid #44add4;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const InfoText = styled.p`
  font-size: 14px;
  margin: 5px 0;
  text-align: left;
  width: 100%;
`;

export const MoreInfoButton = styled.button`
  background: #44add4;
  color: #fff;
  padding: 10px;
  text-align: center;
  border-radius: 7px;
  border: none;
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #3690b0;
  }
`;
