import React from "react";
import { CardOrder, PageIndicate, Table } from "../../components";
import { BaseTemplate } from "../../Container";
import { CardContainer } from "./styles";

const campaignData = [
  {
    campaign: "Campanha de Verão",
    status: "Ativa",
    budget: "R$ 10.000",
    cpa: "R$ 50",
    spent: "R$ 5.000",
    cpc: "R$ 2",
    roi: "150%",
    costPerFinalization: "R$ 70",
  },
  {
    campaign: "Promoção de Inverno",
    status: "Inativa",
    budget: "R$ 8.000",
    cpa: "R$ 60",
    spent: "R$ 4.000",
    cpc: "R$ 1,50",
    roi: "120%",
    costPerFinalization: "R$ 65",
  },
  {
    campaign: "Descontos da Primavera",
    status: "Ativa",
    budget: "R$ 12.000",
    cpa: "R$ 55",
    spent: "R$ 6.500",
    cpc: "R$ 2,20",
    roi: "130%",
    costPerFinalization: "R$ 75",
  },
  {
    campaign: "Descontos da Primavera",
    status: "Ativa",
    budget: "R$ 12.000",
    cpa: "R$ 55",
    spent: "R$ 6.500",
    cpc: "R$ 2,20",
    roi: "130%",
    costPerFinalization: "R$ 75",
  },
  {
    campaign: "Descontos da Primavera",
    status: "Ativa",
    budget: "R$ 12.000",
    cpa: "R$ 55",
    spent: "R$ 6.500",
    cpc: "R$ 2,20",
    roi: "130%",
    costPerFinalization: "R$ 75",
  },
  {
    campaign: "Descontos da Primavera",
    status: "Ativa",
    budget: "R$ 12.000",
    cpa: "R$ 55",
    spent: "R$ 6.500",
    cpc: "R$ 2,20",
    roi: "130%",
    costPerFinalization: "R$ 75",
  },
];

const Clients: React.FC = () => {
  return (
    <BaseTemplate 
    value="R$ 76.960,20">
      <CardContainer>
        <CardOrder title="Clientes" value="105" widthCard={49} />
        <CardOrder title="Clientes" value="105" widthCard={49} />
      </CardContainer>

      <PageIndicate title="Clientes" mt={26} mb={28} />

      <Table data={campaignData} />
    </BaseTemplate>
  );
};

export default Clients;
