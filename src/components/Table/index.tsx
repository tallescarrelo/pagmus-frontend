import React, { useState } from "react";
import checkIcon from "../../assets/icons/check_circle_outline2x.png";
import pixIcon from "../../assets/icons/pix2x.png";
import zoominIcon from "../../assets/icons/zoomin2x.png";
import { TBody, TD, TH, THead, TR, Table } from "./styles";
import { CampaignData } from "./types";

interface CampaignTableProps {
  data: CampaignData[];
  darkMode?: boolean;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ data, darkMode }) => {
  const [activeStatus, setActiveStatus] = useState(
    new Array(data.length).fill(false)
  );

  const handleToggle = (index: number) => {
    const updatedStatus = [...activeStatus];
    updatedStatus[index] = !updatedStatus[index];
    setActiveStatus(updatedStatus);
  };

  const renderStatusIcon = (status: string) => {
    if (status === "Ativo") {
      return <img src={checkIcon} alt="Status Ativo" style={{ width: "16px" }} />;
    }
    return null;
  };

  const renderActionIcons = () => {
    return (
      <div style={{ display: "flex", gap: "8px" }}>

      </div>
    );
  };

  return (
    <Table>
      <THead>
        <TR >
          <TH >Produto</TH>
          <TH >Comprador</TH>
          <TH >Método</TH>
          <TH >Valor</TH>
          <TH >Data do Pedido</TH>
          <TH >Data de Pagamento</TH>
          <TH >Afiliado</TH>
          <TH >Comissão</TH>
          <TH >Status</TH>
          <TH >Ações</TH>
        </TR>
      </THead>
      <TBody>
  {data.map((item, index) => (
    <TR key={index} >
      <TD >
        <input type="checkbox" style={{ marginRight: 5 }} />
        {item.product}
      </TD>
      <TD >{item.buyer}</TD>
      <TD >
        <img src={pixIcon} alt="Pix" style={{ width: "16px" }} />
      </TD>
      <TD >{item.value}</TD>
      <TD >{item.orderDate}</TD>
      <TD >{item.payDay}</TD>
      <TD >{item.affiliate}</TD>
      <TD >{item.commission}</TD>
      <TD >
      <img src={checkIcon} alt="Aprovado" style={{ width: "16px" }} />
      </TD>
      <TD >
        <img
          src={zoominIcon}
          alt="Detalhes"
          style={{ width: "16px", cursor: "pointer" }}
        />
      </TD>
    </TR>
  ))}
</TBody>

    </Table>
  );
};

export default CampaignTable;
