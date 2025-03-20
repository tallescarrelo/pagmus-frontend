import { useState } from "react";
import { Container, IconLeft, IconRight } from "./styles";

import { PropsButton } from "./types";

const Button = ({
  label,
  backgroundColor,
  color,
  fontSize,
  onClick,
  iconLeft,
  iconRight,
}: PropsButton) => {

  return (
    <Container
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
    >
      {iconLeft && <IconLeft src={iconLeft} />}

      {label}

      {iconRight && <IconRight src={iconRight} />}
    </Container>
  );
};

export default Button;
