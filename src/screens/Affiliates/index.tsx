// src/screens/Affiliates/index.tsx

import React, { useEffect, useState } from "react";
import { BaseTemplate } from "../../Container";
import { PageIndicate } from "../../components";
import {
  Filter,
  FilterContainer,
  LowerContainer,
  PageIndicateContainer,
  Vector,
  HeaderRow,
  DataRow,
  PaginationContainer,
  PaginationButton,
  PageNumbersContainer,
  PageNumberButton,
  ProductName,
  StyledButton,
  Wrapper,
  StatusButton,
  ActionButton,
} from "./styles";
import { useNavigate } from "react-router-dom";

import VectorPng from "../../assets/icons/Vector.png";

import ArrowLeft from "../../assets/icons/arrowleft.png";
import ArrowRight from "../../assets/icons/arrowright.png";

import { IAffiliate } from "./types";

const affiliatesList: IAffiliate[] = [
  {
    produto: "100Rugas",
    dataPedido: "25/11/2024 19:13:23",
    dataDoStatus: "25/11/2024 19:13:23",
    tipoDecomissao: "Porcentagem",
    valorDaComissão: "60%",
    status: "aprovado",
    acoes: "Cancelar Afiliação",
  },
  {
    produto: "100Rugas",
    dataPedido: "25/11/2024 19:13:23",
    dataDoStatus: "25/11/2024 19:13:23",
    tipoDecomissao: "Porcentagem",
    valorDaComissão: "60%",
    status: "reprovado",
    acoes: "Cancelar Afiliação",
  },
  {
    produto: "100Rugas",
    dataPedido: "25/11/2024 19:13:23",
    dataDoStatus: "25/11/2024 19:13:23",
    tipoDecomissao: "Porcentagem",
    valorDaComissão: "60%",
    status: "aprovado",
    acoes: "Cancelar Afiliação",
  },
  {
    produto: "100Rugas",
    dataPedido: "25/11/2024 19:13:23",
    dataDoStatus: "25/11/2024 19:13:23",
    tipoDecomissao: "Porcentagem",
    valorDaComissão: "60%",
    status: "pendente",
    acoes: "Cancelar Afiliação",
  },
];
const Affiliates: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentDate(formattedDate);
    };

    updateDate();
    const timer = setInterval(updateDate, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleReceivedRequestsClick = () => {
    navigate("/solicitações");
  };

  return (
    <BaseTemplate>
      <PageIndicateContainer>
        <PageIndicate title="Afiliados" />
        <Wrapper>
          <StyledButton active>Socilitações enviadas</StyledButton>
          <StyledButton onClick={handleReceivedRequestsClick}>Solicitações recebidas</StyledButton>
        </Wrapper>

        <FilterContainer>
          <Filter>Hoje: {currentDate}</Filter>
          <Vector src={VectorPng} alt="Icone de filtro" />
        </FilterContainer>
      </PageIndicateContainer>

      <LowerContainer>
        <HeaderRow>
          <Filter>Produto</Filter>
          <Filter>Data do pedido</Filter>
          <Filter>Data do status</Filter>
          <Filter>Tipo de Comissão</Filter>
          <Filter>Valor da comissão</Filter>
          <Filter>Status</Filter>
          <Filter>Ações</Filter>
        </HeaderRow>

        {affiliatesList.map((item, index) => (
          <DataRow key={index}>
            <ProductName>{item.produto}</ProductName>
            <Filter>{item.dataPedido}</Filter>
            <Filter>{item.dataDoStatus}</Filter>
            <Filter>{item.tipoDecomissao}</Filter>
            <Filter>{item.valorDaComissão}</Filter>
            <StatusButton status={item.status}>{item.status}</StatusButton>
            <ActionButton>{item.acoes}</ActionButton>
          </DataRow>
        ))}

        <PaginationContainer>
          <PaginationButton>
            <img src={ArrowLeft} alt="Arrow Left" />
            Anterior
          </PaginationButton>

          <PageNumbersContainer>
            <PageNumberButton>1</PageNumberButton>
            <PageNumberButton>2</PageNumberButton>
            <PageNumberButton>3</PageNumberButton>
            <PageNumberButton>...</PageNumberButton>
            <PageNumberButton>10</PageNumberButton>
          </PageNumbersContainer>

          <PaginationButton>
            Próxima
            <img src={ArrowRight} alt="Arrow Right" />
          </PaginationButton>
        </PaginationContainer>
      </LowerContainer>
    </BaseTemplate>
  );
};

export default Affiliates;
