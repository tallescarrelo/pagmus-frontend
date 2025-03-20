import React, { useState } from "react";
import { PaymentStatus, ProcessingStatus, StatusIndicator, TBody, TD, TH, THead, TR, Table, Tag } from "./styles";
import { OrderData } from "./types";

interface OrderTableProps {
  data: OrderData[];
  darkMode?: boolean;
}

const OrdersTable: React.FC<OrderTableProps> = ({ data, darkMode }) => {
  const [activeStatus, setActiveStatus] = useState(new Array(data.length).fill(false));

  const handleToggle = (index: number) => {
    const updatedStatus = [...activeStatus];
    updatedStatus[index] = !updatedStatus[index];
    setActiveStatus(updatedStatus);
  };

  return (
    <Table>
      <THead>
        <TR >
          <TH >Pedido</TH>
          <TH >Data</TH>
          <TH >Cliente</TH>
          <TH >Canais de Vendas</TH>
          <TH >Total</TH>
          <TH >Status do Pagamento</TH>
          <TH >Status de Processamento</TH>
          <TH >Itens</TH>
          <TH >Forma de Entrega</TH>
          <TH >Tags</TH>
        </TR>
      </THead>
      <TBody>
        {data.map((item, index) => (
          <TR key={index} >
            <TD >
              <input type="checkbox" style={{ marginRight: 5 }} />
              {item.pedido}
            </TD>
            <TD >{item.data}</TD>
            <TD >{item.cliente}</TD>
            <TD >{item.canaisDeVendas}</TD>
            <TD >{item.total}</TD>
            <TD >
              <PaymentStatus status={item.pagamentoStatus}>
                <StatusIndicator status={item.pagamentoStatus} />{item.pagamentoStatus}
              </PaymentStatus>
            </TD>
            <TD >
              <ProcessingStatus status={item.processamentoStatus}>
                <StatusIndicator status={item.processamentoStatus} />{item.processamentoStatus}
              </ProcessingStatus>
            </TD>
            <TD >{item.itens}</TD>
            <TD >{item.formaDeEntrega}</TD>
            <TD >
              {item.tags.map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
};

export default OrdersTable;
