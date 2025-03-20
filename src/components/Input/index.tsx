import React from "react";
import { PropsInput } from "./types";

import {
  Container,
  LabelContainer,
  Label,
  InputForm,
  IconPassword,
  ButtonIcon,
} from "./styles";

const Input = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  iconPassword,
  mt,
  mb,
}: PropsInput) => {
  return (
    <Container mt={mt} mb={mb}>
      <LabelContainer>
        {label && <Label>{label}</Label>}{" "}
        {iconPassword && (
          <ButtonIcon>
            <IconPassword src={iconPassword} />
          </ButtonIcon>
        )}
      </LabelContainer>
      <InputForm
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
};

export default Input;
