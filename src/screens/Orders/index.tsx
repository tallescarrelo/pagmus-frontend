import React from "react";
import { BaseTemplate } from "../../Container";
import { CardOrder, PageIndicate, Button } from "../../components";
import OrdersTable from "../../components/OrdersTable";
import {
  CardContainer,
  PageIndicateContainer,
  ButtonContainer,
} from "./styles";
import { OrderData } from "../../components/OrdersTable/types";

const orderData: OrderData[] = [
  {
    id: 1,
    pedido: "#1234",
    data: "segunda-feira, às 15:40",
    cliente: "Rodrigo Affonso dos Santos Echeverris",
    canaisDeVendas: 2,
    total: "R$ 169,95",
    pagamentoStatus: "Pagamento pendente",
    processamentoStatus: "Não processado",
    itens: "3 itens",
    formaDeEntrega: "CORREIOS",
    tags: ["TAG 1", "TAG 2"]
  },
  {
    id: 1,
    pedido: "#1234",
    data: "segunda-feira, às 15:40",
    cliente: "Rodrigo Affonso dos Santos Echeverris",
    canaisDeVendas: 2,
    total: "R$ 169,95",
    pagamentoStatus: "Pago",
    processamentoStatus: "Processado",
    itens: "3 itens",
    formaDeEntrega: "CORREIOS",
    tags: ["TAG 1", "TAG 2"]
  },
];


const Orders: React.FC = () => {
  return (
    <BaseTemplate value="R$ 76.960,20">
      <CardContainer>
        <CardOrder title="Pedidos" value="105" />
        <CardOrder title="Itens pedidos" value="105" />
        <CardOrder title="Itens devolvidos" value="105" />
        <CardOrder title="Pedidos processados" value="105" />
        <CardOrder title="Pedidos entregues" value="105" />
        <CardOrder title="Tempo de processamento" value="105" />
      </CardContainer>

      <PageIndicateContainer>
        <PageIndicate title="Pedidos" />
      </PageIndicateContainer>

      <ButtonContainer>
        <Button label="Todos" />
        <Button label="Não processados" />
        <Button label="Não pagos" />
        <Button label="Abertos" />
        <Button label="Fechados" />
      </ButtonContainer>

      <OrdersTable data={orderData} />
    </BaseTemplate>
  );
};

export default Orders;
