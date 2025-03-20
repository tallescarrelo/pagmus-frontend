import React from "react";
import { PropsCardOrder } from "./types";
import { Container, Title, Value } from "./styles";

const CardOrder = ({ title, value, widthCard }: PropsCardOrder) => {
  return (
    <Container widthCard={widthCard}>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Container>
  );
};

export default CardOrder;
