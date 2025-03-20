// src/screens/Affiliates/index.tsx

import React, { useEffect, useState } from "react";
import { BaseTemplate } from "../../Container";
import { PageIndicate } from "../../components";
import {
  Filter,
  FilterContainer,
  LowerContainer,
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
  PageIndicateContainer,
  Vector,
} from "./styles";
import { useNavigate } from "react-router-dom";

import VectorPng from "../../assets/icons/Vector.png";

import ArrowLeft from "../../assets/icons/arrowleft.png";
import ArrowRight from "../../assets/icons/arrowright.png";
import AwardIcon from "../../assets/icons/awards@3x.png";
import { IAffiliate } from "./types";

const affiliatesList: IAffiliate[] = [
  {
    afiliado: "021.233.123-30 Talles Albuquerque",
    email: "talles@sparkmobile.com",
    produto: "100Rugas",
    dataDoPedido: "25/11/2024 19:13:23",
    dataDoStatus: "25/11/2024 19:13:23",
    status: "aprovado",
    premiações: "",
    acoes: "Reprovar agora",
  },
  {
    afiliado: "021.233.123-30 Talles Albuquerque",
    email: "talles@sparkmobile.com",
    produto: "100Rugas",
    dataDoPedido: "25/11/2024 19:13:23",
    dataDoStatus: "25/11/2024 19:13:23",
    status: "aprovado",
    premiações: "",
    acoes: "Aprovar agora",
  },
  {
    afiliado: "021.233.123-30 Talles Albuquerque",
    email: "talles@sparkmobile.com",
    produto: "100Rugas",
    dataDoPedido: "25/11/2024 19:13:23",
    dataDoStatus: "25/11/2024 19:13:23",
    status: "aprovado",
    premiações: "",
    acoes: "Reprovar agora",
  },
  {
    afiliado: "021.233.123-30 Talles Albuquerque",
    email: "talles@sparkmobile.com",
    produto: "100Rugas",
    dataDoPedido: "25/11/2024 19:13:23",
    dataDoStatus: "25/11/2024 19:13:23",
    status: "aprovado",
    premiações: "",
    acoes: "Aprovar agora",
  },
];
const AffiliatesSolicitation: React.FC = () => {
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
    navigate("/afiliados");
  };

  return (
    <BaseTemplate>
      <PageIndicateContainer>
        <PageIndicate title="Afiliados" />
        <Wrapper>
          <StyledButton onClick={handleReceivedRequestsClick}>
            Socilitações enviadas
          </StyledButton>
          <StyledButton active>Solicitações recebidas</StyledButton>
        </Wrapper>

        <FilterContainer>
          <Filter>Hoje: {currentDate}</Filter>
          <Vector src={VectorPng} alt="Icone de filtro" />
        </FilterContainer>
      </PageIndicateContainer>

      <LowerContainer>
        <HeaderRow>
          <Filter className="afiliado-header">Afiliado</Filter>
          <Filter>Email</Filter>
          <Filter>Produto</Filter>
          <Filter>Data do Pedido</Filter>
          <Filter>Data do Status</Filter>
          <Filter>Status</Filter>
          <Filter>Premiações</Filter>
          <Filter>Ações</Filter>
        </HeaderRow>

        {affiliatesList.map((item, index) => (
          <DataRow key={index}>
            <ProductName>
              <div>
                <input type="checkbox" /> {item.afiliado.split(" ")[0]}
              </div>
              <div>
                <strong>{item.afiliado.split(" ").slice(1).join(" ")}</strong>
              </div>
            </ProductName>
            <Filter style={{ color: "#101828" }}>{item.email}</Filter>
            <Filter>{item.produto}</Filter>
            <Filter>{item.dataDoPedido}</Filter>
            <Filter>{item.dataDoStatus}</Filter>
            <StatusButton status={item.status}>{item.status}</StatusButton>
            <Filter>
              <img
                src={AwardIcon}
                alt="Ícone de Premiação"
                style={{ width: "80px", height: "24px", marginRight: "8px" }}
              />
              {item.premiações}
            </Filter>
            <ActionButton actionType={item.acoes}>{item.acoes}</ActionButton>
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

export default AffiliatesSolicitation;
