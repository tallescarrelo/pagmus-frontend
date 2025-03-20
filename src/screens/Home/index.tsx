import React from "react";
import { BaseTemplate } from "../../Container/";
import { CardDetail, PageIndicate, ProgressBar, Table } from "../../components";
import { PropsProgressBar } from "../../components/ProgressBar/types";
import { PropsRevenueDetails } from "../../components/RevenueDetail/types";
import { CampaignData } from "../../components/Table/types";
import VectorPng from "../../assets/icons/Vector.png";
import { useTheme } from "../../context/useTheme";
import {
  CardStatus,
  CardStatusContainer,
  ContainerCardDetail,
  DisabledAll,
  Filter,
  FilterContainer,
  InitialContainer,
  InitialLabelContainer,
  NoRecordContainer,
  NoRecordText,
  SeparatorVertical,
  SubTitlePayment,
  TabContainer,
  TabInitialLabel,
  TableContainer,
  TitlePayment,
  Vector,
} from "./styles";

const campaignData: CampaignData[] = [
  {
    product: "Magrafit Pro+",
    buyer: "Thiago Antunes",
    method: "",
    value: "R$ 165,00",
    orderDate: "25/11/2024 19:13:23",
    payDay: "25/11/2024 19:13:23",
    affiliate: "Cristiano Silva",
    commission: "R$ 12,44",
    status: "",
    actions: "",
  },
  {
    product: "Magrafit Pro+",
    buyer: "Thiago Antunes",
    method: "",
    value: "R$ 165,00",
    orderDate: "25/11/2024 19:13:23",
    payDay: "25/11/2024 19:13:23",
    affiliate: "Cristiano Silva",
    commission: "R$ 12,44",
    status: "",
    actions: "",
  },
  {
    product: "Magrafit Pro+",
    buyer: "Thiago Antunes",
    method: "",
    value: "R$ 165,00",
    orderDate: "25/11/2024 19:13:23",
    payDay: "25/11/2024 19:13:23",
    affiliate: "Cristiano Silva",
    commission: "R$ 12,44",
    status: "",
    actions: "",
  },
  {
    product: "Magrafit Pro+",
    buyer: "Thiago Antunes",
    method: "",
    value: "R$ 165,00",
    orderDate: "25/11/2024 19:13:23",
    payDay: "25/11/2024 19:13:23",
    affiliate: "Cristiano Silva",
    commission: "R$ 12,44",
    status: "",
    actions: "",
  },
  {
    product: "Magrafit Pro+",
    buyer: "Thiago Antunes",
    method: "",
    value: "R$ 165,00",
    orderDate: "25/11/2024 19:13:23",
    payDay: "25/11/2024 19:13:23",
    affiliate: "Cristiano Silva",
    commission: "R$ 12,44",
    status: "",
    actions: "",
  },
];

const detailStatus: PropsProgressBar[] = [
  {
    title: "Boletos (12%)",
    type: "ticket",
    value: "5,333",
  },
  {
    title: "Cartão de crédito  (72%)",
    type: "creditCard",
    value: "5,333",
  },
  {
    title: "Pix  (32%)",
    type: "pix",
    value: "5,333",
  },
];

const RevenueDetails: PropsRevenueDetails[] = [
  {
    title: "Total deste mês",
    value: 1000,
    percentage: 5,
  },
  {
    title: "Vendas de hoje",
    value: 1000,
    percentage: 6,
  },
  {
    title: "Antecipação",
    value: 1000,
    percentage: 7,
  },
  {
    title: "Taxa de Aprovação",
    value: 1000,
    percentage: 8,
  },
  {
    title: "Saldo Disponível",
    value: 1000,
    percentage: 9,
  },
  {
    title: "A Receber",
    value: 1000,
    percentage: 2,
  },
  {
    title: "Taxa Conversão",
    value: 1000,
    percentage: 4,
  },
  {
    title: "Taxa de Reprovação",
    value: 1000,
    percentage: 3,
  },
];

const Home: React.FC = () => {
 const { toggleTheme, theme } = useTheme()

  return (
    <BaseTemplate value="R$ 76.960,20"  theme={theme} changeTheme={toggleTheme} >
      <InitialContainer>
        <PageIndicate title="Suas comissões"  />

        <FilterContainer>
          <Filter>Hoje: 17 de fevereiro de 2025</Filter>
          <Vector
            src={VectorPng}
            alt={ "Icone de filtro"}
          />
        </FilterContainer>
      </InitialContainer>

      <CardStatusContainer>
        <CardStatus >
          <TitlePayment >R$ 35.023,22</TitlePayment>
          <SubTitlePayment>Total de comissões arrecadadas</SubTitlePayment>

          {detailStatus.map((payments) => (
            <ProgressBar
              type={payments.type}
              title={payments.title}
              value={payments.value}
              
            />
          ))}
        </CardStatus>

        <ContainerCardDetail>
          {RevenueDetails.map((revenueCard) => (
            <CardDetail
              title={revenueCard.title}
              value={revenueCard.value}
              percentage={revenueCard.percentage}
              
            />
          ))}
        </ContainerCardDetail>
      </CardStatusContainer>

      <TabContainer>
        <InitialLabelContainer>
          <SeparatorVertical />
          <TabInitialLabel >Vendas</TabInitialLabel>
        </InitialLabelContainer>

        <FilterContainer>
          <Filter>Hoje: 17 de fevereiro de 2025</Filter>
          <Vector
            src={VectorPng}
            alt={ "Icone de filtro"}
          />
        </FilterContainer>
      </TabContainer>

      <TableContainer>
        {campaignData.length > 0 ? (
          <Table data={campaignData} />
        ) : (
          <NoRecordContainer>
            <NoRecordText>Nenhum registro econtrado</NoRecordText>
          </NoRecordContainer>
        )}
      </TableContainer>
    </BaseTemplate>
  );
};

export default Home;
