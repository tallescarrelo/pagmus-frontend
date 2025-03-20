import styled from "styled-components";

export const Container = styled.div`
  width: 549px;
  height: auto;
`;

export const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;  
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100%;
`;

export const Title = styled.text`
  color: #030229;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
`;


export const StatusContainer = styled.div`
  display: flex;
  background-color: #ECFDF3;
`;

export const StatusDot = styled.img`
  width: 8px;
  height: 8px;
  align-self: center;
`;

export const StatusText = styled.text`
  color: #008B52;
  font-weight: 500;
  align-self: center;
  font-size: 9px;
  line-height: 14px;
  margin-left: 5px;
`;

export const CloseIconContainer = styled.button`
  display: flex;
  background: none;
  border: none;
  margin-top: 10px;
`;

export const CloseIcon = styled.img`
  width: 10px;
  height: 10px;
`;

export const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
  border-bottom: 1px solid #44ADD4;
`;

export const StepTitle = styled.text`
  color: #44ADD4;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export const StepNumber = styled.text`
  color: #44ADD4;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export const SwitchContainer = styled.div`
display: flex;
flex-direction: row;
width: 100%;
margin-top: 10px;

`;

export const SwitchText = styled.text`
font-family: Inter;
font-weight: 500;
font-size: 14px;
line-height: 20px;
letter-spacing: 0%;
`;

export const StyledSwitch = styled.div<{ checked: boolean }>`
  width: 40px;
  height: 20px;
  background: ${({ checked }) => (checked ? "#4CAF50" : "#ccc")};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 10px;
 

  &:before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${({ checked }) => (checked ? "22px" : "2px")};
    transition: left 0.3s;
  }
`;


export const RadioButtonContainer = styled.div`
display: flex;
flex-direction: column
width: 100%;
margin-top: 10px;
margin-bottom: 10px;
`;

export const RadioButton = styled.input.attrs({ type: 'radio' })`
  width: 20px;
  height: 20px; 
  border-radius: 50%; 
  appearance: none;
  border: 1px solid #D0D5DD; 
  background-color: white; 
  position: relative; 
  transition: all 0.3s ease;
  margin-right: 10px;

 
  &::before {
    content: ''; 
    position: absolute;
    top: 25%; 
    left: 25%; 
    width: 50%; 
    height: 50%; 
    border-radius: 50%; 
    background-color: transparent; 
    transition: all 0.3s ease; 
  }

  &:checked::before {
    background-color: #44ADD4; 
  }

    &:checked {
    border: 1px solid #44ADD4; 

  &:hover {
    transform: scale(1.1); 
  }
`;


export const RadioButtonLabel = styled.text`
font-family: Inter;
font-weight: 500;
font-size: 16px;
line-height: 24px;
letter-spacing: 0%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
`;

export const InputLabel = styled.text`
  color: #344054
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0%;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 44;
  padding: 10px 14px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #D0D5DD;

   &::placeholder {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #101828; 
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const Button = styled.button<{ variant?: "primary" | "continue" }>`
  width: 244px;
  height: 44px;
  gap: 10px;
  padding: 10px 14px;
  background-color:${(props) =>
    props.variant === "continue" ? "#10B1B1" : "#FFFFFF"}; 
  color: ${(props) =>
    props.variant === "continue" ? "#FFFFFF" : "#344054"}; 
  border: none;
  border-radius: 8px;
  cursor: pointer;
  border-radius: 123px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #d0d5dd;
`;

export const LowerText = styled.text`
font-family: Inter;
font-weight: 400;
font-size: 12px;
line-height: 24px;
letter-spacing: 0%;
color: #B2B2B2;
`;

export const Select = styled.select`
  width: 100%;
  height: 44px;
  padding: 10px 14px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: #d0d5dd;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;

  option {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
  }

  option[disabled] {
    color: #9e9e9e;
    font-style: italic;
  }
`;

export const InputValueComission = styled.input`
  border: none;
  border-bottom: 2px solid #d0d5dd;
  padding: 8px 0;
  font-size: 16px;
  outline: none;
  width: 100%;

  &:focus {
    border-bottom: 2px solid #44ADD4; /* Cor ao focar */
  }
`;

export const Option = styled.option``;

export const PlaceholderOption = styled.option.attrs({
  disabled: true,
  selected: true,
  value: ''
})`
  color: #9e9e9e;
  font-style: italic;
`;
