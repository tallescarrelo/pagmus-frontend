import React, { useState } from "react";
import {
    StyledModal,
    ModalHeader,
    ModalTitle,
    StatusContainer,
    StatusDot,
    StatusText,
    SubtitleContainer,
    SubtitleButton,
    ModalContent,
    SectionTitle,
    MediaContainer,
    MediaPlaceholder,
    UploadPlaceholder,
    ModalFooter,
    FooterButton,
    MediaIcon,
    UploadIcon,
    UploadButton,
    UploadText,
    InputComponent,
    DescriptionInput,
    InputContainer,
    InputComponentWithIcon,
    InputComponentIcon,
} from "./styles";
import vectorIcon from "../../assets/icons/Vector@2x.png";
import photoIcon from "../../assets/icons/photo.png";
import uploadIcon from "../../assets/icons/upload-cloud@2x.png";
import { ImportedProductData } from "../ImportedProductsTable/types";
import { InfoModalProps } from "./types";

const InfoModal: React.FC<{ product: InfoModalProps; isOpen: boolean; onClose: () => void }> = ({ product, isOpen, onClose }) => {
  const [publishing, setPublishing] = useState({
    lojaVirtual: false,
    pontoDeVenda: false,
  });
  const [markets, setMarkets] = useState({
    brasil: false,
    internacional: false,
  });
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [collections, setCollections] = useState("");
  const [tags, setTags] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<ImportedProductData | null>(null);
    const [activeSubtitle, setActiveSubtitle] = useState("Informações Gerais");

    const closeModal = () => {
        onClose();
    };

    return (
        <StyledModal
        isOpen={isOpen}
        onClose={closeModal}
        onRequestClose={closeModal}
      >
        <ModalHeader>
          <ModalTitle>{product?.name}</ModalTitle>
          <StatusContainer>
            <StatusDot status={product?.status} />
            <StatusText status={product?.status}>{product?.status}</StatusText>
          </StatusContainer>
        </ModalHeader>
        <SubtitleContainer>
          <SubtitleButton
            active={activeSubtitle === "Informações Gerais"}
            onClick={() => setActiveSubtitle("Informações Gerais")}
          >
            Informações Gerais
          </SubtitleButton>
          <SubtitleButton
            active={activeSubtitle === "Detalhes do Produto"}
            onClick={() => setActiveSubtitle("Detalhes do Produto")}
          >
            Detalhes do Produto
          </SubtitleButton>
        </SubtitleContainer>
        <ModalContent>
          <SectionTitle>Título</SectionTitle>
          <InputComponent type="text" placeholder="Enter text here" />
          <SectionTitle>Descrição</SectionTitle>
          <DescriptionInput>Placeholder</DescriptionInput>
          <SectionTitle>Status</SectionTitle>
          <InputContainer onClick={() => {}}>
            <InputComponentWithIcon type="text" placeholder="Enter text here" value={product?.status} readOnly />
            <InputComponentIcon src={vectorIcon} alt=""/>
          </InputContainer>
          <SectionTitle>Mídia</SectionTitle>
          <MediaContainer>
            <MediaPlaceholder>
              <MediaIcon src={photoIcon} alt="" />
            </MediaPlaceholder>
            <MediaPlaceholder>
              <MediaIcon src={photoIcon} alt="" />
            </MediaPlaceholder>
            <MediaPlaceholder>
              <MediaIcon src={photoIcon} alt="" />
            </MediaPlaceholder>
            <MediaPlaceholder>
              <MediaIcon src={photoIcon} alt="" />
            </MediaPlaceholder>
          </MediaContainer>
          <UploadPlaceholder>
            <UploadIcon src={uploadIcon} alt="" />
            <UploadText>
              <UploadButton>Clique aqui</UploadButton> ou arraste o arquivo<br />
              SVG, PNG, JPG ou GIF (max. 800x400px)
            </UploadText>
          </UploadPlaceholder>
        </ModalContent>
        <ModalFooter>
          <FooterButton onClick={closeModal}>Cancelar</FooterButton>
          <FooterButton primary onClick={() => alert("Salvo!")}>
            Salvar
          </FooterButton>
        </ModalFooter>
      </StyledModal>
    );
};

export default InfoModal;