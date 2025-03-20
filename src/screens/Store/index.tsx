import React, { useState } from "react";
import { PageIndicate } from "../../components";
import { BaseTemplate } from "../../Container";
import { PageIndicateContainer, RowContainer } from "./styles";
import StoreProduct from "../../components/StoreProduct";
import Modal from "../../components/Modal";
import StoreProductModal from "../../components/StoreProductModal";
import ProdutoPng from '../../assets/icons/produto.png';
import ProdutoPng2x from "../../assets/icons/produtopng@2x.png";


const Store: React.FC = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleOpenProductModal = () => {
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
  };

  return (
    <BaseTemplate hideStatus={true}>
      <PageIndicateContainer>
        <PageIndicate title="Loja" />
      </PageIndicateContainer>

      <RowContainer>
        <StoreProduct
          imageUrl={ProdutoPng}
          productName="100 Rugas"
          minRange={0}
          maxRange={150}
          category="Saúde, Bem-estar e Beleza"
          producer="FM Suplementos"
          priceRange="R$ 137,00 a R$ 2.000,00"
          onMoreInfoClick={handleOpenProductModal}
        />
      </RowContainer>

      <Modal isOpen={isProductModalOpen} onClose={handleCloseProductModal}>
        <StoreProductModal
          imageUrl={ProdutoPng2x}
          productName="100 Rugas"
          category="Saúde, Bem-estar e Beleza"
          productLink="http://100rugas.com.br"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          totalValue="R$ 105,41"
          taxes="R$ 0,41"
          clientName="Fulano da Silva"
          clientCPF="000.000.000-00"
          clientEmail="fulano@email"
          clientPhone="(00) 00000-0000"
          paymentMethod="Pix"
          deliveryTime="2 a 4 semanas"
          onPromote={() => alert('Você promove este produto!')}
        />
      </Modal>
    </BaseTemplate>
  );
};

export default Store;
