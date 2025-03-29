import React, { useState } from "react";
import { PageIndicate } from "../../components";
import CardProduct from "../../components/CardProduct";
import Modal from "../../components/Modal";
import StepFour from "../../components/RegisterProductModal/StepFour";
import StepOne from "../../components/RegisterProductModal/StepOne";
import StepThree from "../../components/RegisterProductModal/StepThree";
import StepTwo from "../../components/RegisterProductModal/StepTwo";
import { BaseTemplate } from "../../Container";
import { ButtonWrapper, PageIndicateContainer, RowContainer, StyledButton } from "./styles";

const Product: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [viewMode, setViewMode] = useState<"meusProdutos" | "promoted">("meusProdutos");

  const handleCloseModal = () => {
    setModalVisible(false);
    setStep(1);
  };
  
  const handleOpenModal = () => setModalVisible(true);

  return (
    <BaseTemplate hideStatus={true}>
      <PageIndicateContainer>
        {!viewMode.includes("promoted") && <PageIndicate title="Meus produtos" />}
        <ButtonWrapper>
  <StyledButton 
    onClick={() => setViewMode("meusProdutos")} 
    active={viewMode === "meusProdutos"}
  >
    Meus Produtos
  </StyledButton>

  <StyledButton 
    onClick={() => setViewMode("promoted")} 
    active={viewMode === "promoted"}
  >
    Produtos que promovo
  </StyledButton>

  <StyledButton 
    onClick={handleOpenModal} 
    active={modalVisible}
  >
    Cadastrar produto
  </StyledButton>
</ButtonWrapper>  
      </PageIndicateContainer>

      {viewMode === "meusProdutos" ? (
        <>
          <RowContainer>
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </RowContainer>

          <PageIndicateContainer>
            <PageIndicate title="Minhas comissões de CoProdutor" />
          </PageIndicateContainer>
          <RowContainer>
            <CardProduct />
            <CardProduct />
          </RowContainer>

          <PageIndicateContainer>
            <PageIndicate title="Minhas comissões de Gerente" />
          </PageIndicateContainer>
          <RowContainer>
            <CardProduct />
            <CardProduct />
          </RowContainer>
        </>
      ) : (
        <>
          <PageIndicateContainer>
            <PageIndicate title="Produtos que promovo" />
          </PageIndicateContainer>
          <RowContainer>
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </RowContainer>

          <PageIndicateContainer>
            <PageIndicate title="Minha comissão de CoProdutor" />
          </PageIndicateContainer>
          <RowContainer>
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </RowContainer>

          <PageIndicateContainer>
            <PageIndicate title="Minhas comissões de Gerente" />
          </PageIndicateContainer>
          <RowContainer>
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </RowContainer>
        </>
      )}

      <Modal isOpen={modalVisible} onClose={handleCloseModal}>
        {step === 1 && <StepOne onNext={() => setStep(2)} />}
        {step === 2 && <StepTwo onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <StepThree onBack={() => setStep(2)} onNext={() => setStep(4)} />}
        {step === 4 && <StepFour onBack={() => setStep(3)} onNext={undefined} />}
      </Modal>
    </BaseTemplate>
  );
};

export default Product;
