import React, { useState } from "react";
import {
  Container,
  LeftSide,
  ProductImage,
  InfoBox,
  IconRow,
  IconImg,
  RightSide,
  ProductHeader,
  ProductTitle,
  ProductCategory,
  PromotionButton,
  Description,
  InfoBoxesContainer,
  TotalValue,
  Value,
  Client,
  Payment,
  Delivery,
  NormalText,
  LabelText,
  WrapperColumn,
  WrapperRow,
  RangeInput,
  ValueDisplay,
} from "./styles";

import UserIcon from "../../assets/icons/client.png";
import PixIcon from "../../assets/icons/pix.png";
import IdIcon from "../../assets/icons/ID.png";
import WhatsappIcon from "../../assets/icons/whatsapp.png";
import MailIcon from "../../assets/icons/mail.png";
import FingerPrintIcon from "../../assets/icons/fingerprint.png";

interface StoreProductModalProps {
  imageUrl: string;
  productName: string;
  category: string;
  productLink: string;
  description: string;
  totalValue: string;
  taxes?: string;
  clientName: string;
  clientCPF: string;
  clientEmail: string;
  clientPhone: string;
  paymentMethod: string;
  deliveryTime: string;
  onPromote?: () => void;
}

const StoreProductModal: React.FC<StoreProductModalProps> = ({
  imageUrl,
  productName,
  category,
  productLink,
  description,
  totalValue,
  taxes,
  clientName,
  clientCPF,
  clientEmail,
  clientPhone,
  paymentMethod,
  deliveryTime,
  onPromote,
}) => {
  const [commission, setCommission] = useState(45);
  const min = 0;
  const max = 100;
  const percent = ((commission - min) / (max - min)) * 100;

  return (
    <Container>
      <LeftSide>
        <ProductImage src={imageUrl} alt={productName} />

        <InfoBox>
          <WrapperRow>
            <WrapperColumn>
              <TotalValue>Valor total</TotalValue>
              <Value>{totalValue}</Value>
            </WrapperColumn>
            <WrapperColumn>
              <NormalText>Produtos - R$ 100,00</NormalText>
              <NormalText>Desconto - R$ 5,50</NormalText>
              <NormalText>Produtos - R$ 100,00</NormalText>
            </WrapperColumn>
          </WrapperRow>
        </InfoBox>

        <InfoBox>
          <Client>Cliente</Client>
          <WrapperRow>
            <WrapperColumn>
              <IconRow>
                <IconImg src={UserIcon} alt="" />
                <LabelText>Nome:</LabelText>
                <NormalText>{clientName}</NormalText>
              </IconRow>
              <IconRow>
                <IconImg src={IdIcon} alt="" />
                <LabelText>CPF:</LabelText>
                <NormalText>{clientCPF}</NormalText>
              </IconRow>
              <IconRow>
                <IconImg src={MailIcon} alt="" />
                <LabelText>Email:</LabelText>
                <NormalText>{clientEmail}</NormalText>
              </IconRow>
            </WrapperColumn>
            <WrapperColumn>
              <IconRow>
                <IconImg src={WhatsappIcon} alt="" />
                <LabelText>Telefone:</LabelText>
                <NormalText>{clientPhone}</NormalText>
              </IconRow>
              <IconRow>
                <IconImg src={FingerPrintIcon} alt="" />
                <LabelText>ID da compra:</LabelText>
                <NormalText>000.000.000</NormalText>
              </IconRow>
            </WrapperColumn>
          </WrapperRow>
        </InfoBox>

        <InfoBox>
          <WrapperRow>
            <WrapperColumn>
              <Payment>Pagamento</Payment>
              <IconRow>
                <IconImg src={PixIcon} alt="" />
                <NormalText>{paymentMethod}</NormalText>
              </IconRow>
            </WrapperColumn>
          </WrapperRow>
        </InfoBox>

        <InfoBox>
          <Delivery>Entrega</Delivery>
          <IconRow>
            <NormalText>{clientName}</NormalText>
          </IconRow>
          <NormalText>Rua dos Vascondes, 10, Parque dos Nobres</NormalText>
          <NormalText>Complemento: Quadra F</NormalText>
          <NormalText>São Luís / MA</NormalText>
          <NormalText>CEP: 000.000.000</NormalText>
          <NormalText>Prazo: {deliveryTime}</NormalText>
          <NormalText>Data prevista: 18/11/2023</NormalText>
          <NormalText>Correios - Prazo de 2 a 4 semanas</NormalText>
        </InfoBox>
      </LeftSide>

      <RightSide>
        <ProductHeader>
          <WrapperRow>
            <WrapperColumn>
              <ProductTitle>{productName}</ProductTitle>
              <ProductCategory>{category}</ProductCategory>
            </WrapperColumn>
            <WrapperColumn>
              <NormalText>Página Vendas: {productLink}</NormalText>
              <NormalText>Tipo de comissionamento: Único Clique</NormalText>
              <NormalText>Comissão dos afiliados: {commission}%</NormalText>
              <RangeInput
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
                percent={`${percent}%`}
                min={min}
                max={max}
              />
              <ValueDisplay>{commission}</ValueDisplay>
            </WrapperColumn>
          </WrapperRow>
        </ProductHeader>

        <PromotionButton onClick={onPromote}>
          Você já promove este produto
        </PromotionButton>

        <InfoBox>
          <Description>Descrição</Description>
          <NormalText>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s...
          </NormalText>
        </InfoBox>

        <InfoBoxesContainer>
          <InfoBox>
            <WrapperRow>
              <WrapperColumn>
                <TotalValue>Valor total</TotalValue>
                <Value>{totalValue}</Value>
              </WrapperColumn>
              <WrapperColumn>
                <NormalText>Produtos - R$ 100,00</NormalText>
                <NormalText>Desconto - R$ 5,50</NormalText>
                <NormalText>Produtos - R$ 100,00</NormalText>
              </WrapperColumn>
            </WrapperRow>
          </InfoBox>

          <InfoBox>
            <Client>Cliente</Client>
            <WrapperRow>
              <WrapperColumn>
                <IconRow>
                  <IconImg src={UserIcon} alt="" />
                  <LabelText>Nome:</LabelText>
                  <NormalText>{clientName}</NormalText>
                </IconRow>
                <IconRow>
                  <IconImg src={IdIcon} alt="" />
                  <LabelText>CPF:</LabelText>
                  <NormalText>{clientCPF}</NormalText>
                </IconRow>
                <IconRow>
                  <IconImg src={MailIcon} alt="" />
                  <LabelText>Email:</LabelText>
                  <NormalText>{clientEmail}</NormalText>
                </IconRow>
              </WrapperColumn>
              <WrapperColumn>
                <IconRow>
                  <IconImg src={WhatsappIcon} alt="" />
                  <LabelText>Telefone:</LabelText>
                  <NormalText>{clientPhone}</NormalText>
                </IconRow>
                <IconRow>
                  <IconImg src={FingerPrintIcon} alt="" />
                  <LabelText>ID da compra:</LabelText>
                  <NormalText>111.111.111</NormalText>
                </IconRow>
              </WrapperColumn>
            </WrapperRow>
          </InfoBox>

          <InfoBox>
            <WrapperRow>
              <WrapperColumn>
                <Payment>Pagamento</Payment>
                <IconRow>
                  <IconImg src={PixIcon} alt="" />
                  <NormalText>{paymentMethod}</NormalText>
                </IconRow>
              </WrapperColumn>
            </WrapperRow>
          </InfoBox>

          <InfoBox>
            <Delivery>Entrega</Delivery>
            <IconRow>
              <NormalText>{clientName}</NormalText>
            </IconRow>
            <NormalText>Rua dos Vascondes, 10, Parque dos Nobres</NormalText>
            <NormalText>Complemento: Quadra F</NormalText>
            <NormalText>São Luís / MA</NormalText>
            <NormalText>CEP: 000.000.000</NormalText>
            <NormalText>Prazo: {deliveryTime}</NormalText>
            <NormalText>Data prevista: 18/11/2023</NormalText>
            <NormalText>Correios - Prazo de 2 a 4 semanas</NormalText>
          </InfoBox>
        </InfoBoxesContainer>
      </RightSide>
    </Container>
  );
};

export default StoreProductModal;
