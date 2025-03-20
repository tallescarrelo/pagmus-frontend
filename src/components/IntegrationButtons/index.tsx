import React from "react";
import importReviewsIcon from "../../assets/icons/reviews.png";
import importProductIcon from "../../assets/icons/product.png";
import {
  ButtonsContainer,
  IntegrationButton,
  ButtonIcon,
} from "./styles"; 


const IntegrationButtons: React.FC = () => {
  return (
    <ButtonsContainer>
      <IntegrationButton style={{ borderColor: "#F27833", backgroundColor: "#F49661" }}>
        <ButtonIcon src={importProductIcon} alt="Importar produto icon" />
        <span>Cadastrar produto</span>
      </IntegrationButton>
    </ButtonsContainer>
  );
};

export default IntegrationButtons;
