import React from "react";
import {
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  Checkbox,
  StatusIndicator,
  StatusText,
  ProductNameContainer,
  DefaultCategoryText,
} from "./styles";
import { ImportedProductData } from "./types";
import defaultImage from "../../assets/icons/Frame.png";

interface ProductTableProps {
  data: ImportedProductData[];
  openModal: (product: ImportedProductData) => void;
}

const ImportedProductTable: React.FC<ProductTableProps> = ({ data, openModal }) => {
  return (
    <Table>
      <THead>
        <TR>
          <TH></TH>
          <TH>Produto</TH>
          <TH>Status</TH>
          <TH>Estoque</TH>
          <TH>Canais de vendas</TH>
          <TH>Mercados</TH>
          <TH>Categoria</TH>
          <TH>Fornecedor</TH>
        </TR>
      </THead>
      <TBody>
        {data.map((item, index) => (
          <TR key={index}>
            <TD>
              <Checkbox type="checkbox" />
            </TD>
            <TD>
              <ProductNameContainer onClick={() => openModal(item)}>
                <img
                  src={item.image || defaultImage}
                  alt={item.name}
                  style={{
                    marginRight: "0.625rem", // 10px -> 0.625rem
                    width: "2.5rem", // 40px -> 2.5rem
                    height: "2.5rem", // 40px -> 2.5rem
                    borderRadius: "0.3125rem", // 5px -> 0.3125rem
                  }}
                />
                <span>{item.name}</span>
              </ProductNameContainer>
            </TD>
            <TD>
              <StatusIndicator status={item.status} />
              <StatusText status={item.status}>{item.status}</StatusText>
            </TD>
            <TD>
              <DefaultCategoryText>{item.stock}</DefaultCategoryText>
            </TD>
            <TD>
              <DefaultCategoryText>{item.salesChannels}</DefaultCategoryText>
            </TD>
            <TD>
              <DefaultCategoryText>{item.markets}</DefaultCategoryText>
            </TD>
            <TD>
              <DefaultCategoryText>{item.category}</DefaultCategoryText>
            </TD>
            <TD>
              <DefaultCategoryText>{item.supplier}</DefaultCategoryText>
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
};

export default ImportedProductTable;