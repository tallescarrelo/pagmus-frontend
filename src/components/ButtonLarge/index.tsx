import React from "react";
import { PropsButtonLarge } from "./types";
import { Container } from "./styles";

const ButtonLarge = ({ label, onClick, mt, mb }: PropsButtonLarge) => {
  return (
    <Container mt={mt} mb={mb} onClick={onClick}>
      {label}
    </Container>
  );
};

export default ButtonLarge;
