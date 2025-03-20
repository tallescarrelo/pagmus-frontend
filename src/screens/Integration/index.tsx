import React from "react";
import { BaseTemplate } from "../../Container";
import IntegrationCard from "../../components/IntegrationCard";
import SideMenu from "../../components/SideMenu";
import {
  PageContainer,
  IntegrationContainer,
  IntegrationCardWrapper,
  MainContent,
  MenuTitleContainer,
  MenuTitle,
  GreenLine,
  Sidebar,
} from "./styles";

const integrations = [
  {
    name: "Shopify",
    description: "Sincronize seus pedidos, produtos e carrinhos abandonados",
  },
  {
    name: "Shopify",
    description: "Sincronize seus pedidos, produtos e carrinhos abandonados",
  },
  {
    name: "Shopify",
    description: "Sincronize seus pedidos, produtos e carrinhos abandonados",
  },
  {
    name: "Shopify",
    description: "Sincronize seus pedidos, produtos e carrinhos abandonados",
  },
  
];

const Integration: React.FC = () => {
  return (
    <BaseTemplate hideStatus={true} showIntegrationButtons={true} showIntegrationsButtonsGroup={true}> 
      <PageContainer>
        <Sidebar>
          <MenuTitleContainer>
            <GreenLine />
            <MenuTitle>Meus produtos</MenuTitle>
          </MenuTitleContainer>
          <SideMenu />
        </Sidebar>
        <MainContent>
          <IntegrationContainer>
            {integrations.map((integration, index) => (
              <IntegrationCardWrapper key={index}>
                <IntegrationCard integration={integration} />
              </IntegrationCardWrapper>
            ))}
          </IntegrationContainer>
        </MainContent>
      </PageContainer>
      
    </BaseTemplate>
  );
};

export default Integration;
