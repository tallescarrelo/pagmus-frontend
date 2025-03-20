import { useState } from "react";
import iconCloseCircle from "../../assets/icons/icon-close-circle.png";
import {
  Button,
  Input,
  SelectInput,
  SeparatorHorizontal
} from "../../components";
import Modal from "../Modal";
import {
  ButtonContainer,
  ButtonIconCloseCircle,
  ButtonTab,
  Container,
  IconCloseCircle,
  IconCloseContainer,
  ImportProductContainer,
  ProductButtonContainer,
  ProductContainer,
  ProductDescription,
  ProductDetailContent,
  ProductImage,
  ProductTitle,
  ProductTitleDetail,
  SubTitle,
  TabContainer,
  Title,
  Wrapper,
} from "./styles";
import { PropsModalImportProduct } from "./types";

const ModalImportProduct = ({
  isOpen,
  onClose,
  type = "default",
}: PropsModalImportProduct) => {
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    { value: "option1", label: "Opção 1" },
    { value: "option2", label: "Opção 2" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <ImportProductContainer type={type}>
          <IconCloseContainer>
            <ButtonIconCloseCircle>
              <IconCloseCircle src={iconCloseCircle} />
            </ButtonIconCloseCircle>
          </IconCloseContainer>

          <Title>Importar produto</Title>
          <SubTitle>Defina como você deseja importar o serviço</SubTitle>
          <TabContainer>
            <ButtonTab>único</ButtonTab>
            <ButtonTab>Multi Produtos</ButtonTab>
            <ButtonTab>Configurações</ButtonTab>
          </TabContainer>
          <SubTitle>
            Selecione a plataforma que você vai importar o produto
          </SubTitle>
          <Wrapper>
            <SelectInput options={options} onChange={setSelectedValue} />
          </Wrapper>

          <SubTitle>
            Cole o link do serviço no campo abaixo e clique em importar
          </SubTitle>
          <Input placeholder="Adicione o produto..." />

          <ButtonContainer>
            <Button label="Importar Produto" />
          </ButtonContainer>
        </ImportProductContainer>

        {/* <SeparatorVertical /> */}

        {type === "product" && (
          <ProductContainer>
            <IconCloseContainer>
              <ButtonIconCloseCircle>
                <IconCloseCircle src={iconCloseCircle} />
              </ButtonIconCloseCircle>
            </IconCloseContainer>
            <Title>Produto importado</Title>

            <SubTitle>Confira o produto importado</SubTitle>

            <SeparatorHorizontal width={100} />

            <ProductDetailContent>
              <ProductImage
                src={
                  "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/calcadaa/catalog/produtos-verao/dsc-0626.jpg"
                }
              />

              <ProductTitleDetail>
                <ProductTitle>Nike Air Max</ProductTitle>

                <ProductDescription>
                  Air Max is an American brand of basketball shoes athletic,
                  casual, and style clothing produced by Nike....
                </ProductDescription>
              </ProductTitleDetail>
            </ProductDetailContent>
            <SeparatorHorizontal width={100} />

            <ProductButtonContainer>
              <Button label="editar produto" backgroundColor="#FBBF24" />
              <Button label="finalizar" />
            </ProductButtonContainer>
          </ProductContainer>
        )}
      </Container>
    </Modal>
  );
};

export default ModalImportProduct;
