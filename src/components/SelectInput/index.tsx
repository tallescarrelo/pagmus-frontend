import React from "react";
import { PropsSelectInput } from "./types";
import { Container, Options } from "./styles";

const SelectInput = ({ options, onChange }: PropsSelectInput) => {
  return (
    <Container onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <Options key={option.value} value={option.value}>
          {option.label}
        </Options>
      ))}
    </Container>
  );
};

export default SelectInput;
