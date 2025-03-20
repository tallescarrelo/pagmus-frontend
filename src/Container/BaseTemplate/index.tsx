import { useState } from "react";
import { useNavigate } from "react-router-dom";
import checkBoxIcon from "../../assets/icons/check_box.png";
import inventoryIcon from "../../assets/icons/inventory.png";
import memberIcon from "../../assets/icons/member.png";
import receiptIcon from "../../assets/icons/receipt_long.png";
import requestQuoteIcon from "../../assets/icons/request_quote.png";
import reedemIcon from "../../assets/icons/redeem.png";
import { Button, Header, ModalImportProduct } from "../../components";

import {
  ButtonLeftContent,
  Container,
  ContainerButton,
  Content,
  MoneyValue,
  Status,
  StatusContainer,
  StatusWrapper,
  Title,
  Value,
  ValueContainer,
} from "./styles";
import { PropsBaseTemplate } from "./types";

const dataButtom = [
  {
    label: "Afiliados",
    path: "/afiliados",
    icon: memberIcon,
  },
  {
    label: "Pedidos",
    path: "/pedidos",
    icon: reedemIcon,
  },
  {
    label: "Produtos",
    path: "/myproducts",
    icon: inventoryIcon,
  },
  {
    label: "Relatórios",
    path: "/reports",
    icon: receiptIcon,
  },
  {
    label: "Financeiro",
    path: "/financeiro",
    icon: requestQuoteIcon,
  },
];

const statusData = [
  {
    title: "Produtos",
    value: "1345",
  },
  {
    title: "Total vendas",
    value: "1323",
  },
  {
    title: "Ticket Médio",
    value: "433,21",
  },
];

const BaseTemplate = ({ children, value, changeTheme, hideStatus, showIntegrationButtons, showIntegrationsButtonsGroup }: PropsBaseTemplate) => {
  const navigate = useNavigate();

  const [showImportProductModal, setShowImportProductModal] = useState(false);
  const [activeButton, setActiveButton] = useState(dataButtom[0].path);

  const handleOpenModal = () => {
    setShowImportProductModal(false);
  };

  return (
    <Container>
      <Header 
        onClickProduct={() => setShowImportProductModal(true)} 
        changeTheme={changeTheme} 
        showIntegrationButtons={showIntegrationButtons}
      />
      <ModalImportProduct
        isOpen={showImportProductModal}
        onClose={handleOpenModal}
      />
      <ContainerButton >
        <ButtonLeftContent>
          {dataButtom.map((button) => (
           <Button
              onClick={() => navigate(button.path)}
              label={button.label}
              color="#48626F"
              backgroundColor="transparent"
              iconLeft={button.icon}
           />
          ))}
        </ButtonLeftContent>

        {/* Podem ser usados no futuro
            <ButtonRightContent>
            {showIntegrationsButtonsGroup ? ( <IntegrationButtonGroup  /> ) : ( <ButtonGroup  /> )}
            </ButtonRightContent>
        */}
    
      </ContainerButton>

      {!hideStatus && (
        <StatusContainer >
          <StatusWrapper>
            {statusData.map((status) => (
              <Status key={status.title}>
                <Title>{status.title}</Title>
                <Value >{status.value}</Value>
              </Status>
            ))}
          </StatusWrapper>

          <ValueContainer>
            <MoneyValue>{value}</MoneyValue>

         <Button 
            label="Solicitar saque" 
            iconRight={checkBoxIcon}
            onClick={() => setActiveButton("solicitar_saque")}
            active={activeButton === "solicitar_saque"} 
          />

          <Button 
            label="Antecipar" 
            onClick={() => setActiveButton("antecipar")}
            active={activeButton === "antecipar"} 
          />

          </ValueContainer>
        </StatusContainer>
      )}

      <Content>{children}</Content>
    </Container>
  );
};

export default BaseTemplate;
