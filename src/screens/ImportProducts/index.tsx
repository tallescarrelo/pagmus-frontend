import React, { useState } from "react";
import { BaseTemplate } from "../../Container/";
import { Button, PageIndicate } from "../../components";
import ImportedProductTable from "../../components/ImportedProductsTable/Index";
import { ImportedProductData } from "../../components/ImportedProductsTable/types";
import {
  PageIndicateContainer,
  RowContainer,
  TabButton,
  TabContainer,
  WrapperButton,
} from "./styles";

import InfoModal from "../../components/InfoModal";
const productData: ImportedProductData[] = [
  {
    image: "",
    name: "Qualitech - Tommy - Mulheres",
    status: "Ativo",
    stock: "Estoque não acompanhado",
    salesChannels: 2,
    markets: 0,
    category: "0",
    supplier: "Minha Loja",
  },
  {
    image: "",
    name: "Qualitech - Tommy - Mulheres",
    status: "Inativo",
    stock: "Estoque não acompanhado",
    salesChannels: 2,
    markets: 0,
    category: "0",
    supplier: "Minha Loja",
  },
  {
    image: "",
    name: "Qualitech - Tommy - Mulheres",
    status: "Sem estoque",
    stock: "Estoque não acompanhado",
    salesChannels: 2,
    markets: 0,
    category: "0",
    supplier: "Minha Loja",
  },
];

const Product: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Todos");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ImportedProductData | null>(null);

  const openModal = (product: ImportedProductData) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <BaseTemplate>
      <PageIndicateContainer>
        <PageIndicate title="Importar produtos" />
        <WrapperButton>
          <Button label="+ Importar produto" onClick={() => openModal(productData[0])} />
        </WrapperButton>
      </PageIndicateContainer>
      <TabContainer>
        <TabButton
          active={selectedTab === "Todos"}
          onClick={() => setSelectedTab("Todos")}
        >
          Todos
        </TabButton>
        <TabButton
          active={selectedTab === "Ativos"}
          onClick={() => setSelectedTab("Ativos")}
        >
          Ativos
        </TabButton>
        <TabButton
          active={selectedTab === "Rascunhos"}
          onClick={() => setSelectedTab("Rascunhos")}
        >
          Rascunhos
        </TabButton>
        <TabButton
          active={selectedTab === "Arquivados"}
          onClick={() => setSelectedTab("Arquivados")}
        >
          Arquivados
        </TabButton>
      </TabContainer>

      <RowContainer>
        <ImportedProductTable data={productData} />
      </RowContainer>
      <ImportedProductTable data={productData} openModal={openModal} />
      <InfoModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </BaseTemplate>
  );
};

export default Product;
