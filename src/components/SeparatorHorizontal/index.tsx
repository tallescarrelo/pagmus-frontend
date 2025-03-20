import React from "react";
import { PropsSeparatorHorizontal } from "./types";
import { Container } from "./styles";

const SeparatorHorizontal = ({ ml, mr, width }: PropsSeparatorHorizontal) => {
  return <Container width={width} ml={ml} mr={mr} />;
};

export default SeparatorHorizontal;
