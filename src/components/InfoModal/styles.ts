import styled from "styled-components";
import Modal from "react-modal";

// Estilo principal do modal
export const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  max-width: 90vw;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  outline: none;

  @media (min-width: 768px) {
    max-width: 80vw;
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    max-width: 60vw;
  }

  @media (min-width: 1280px) {
    max-width: 40vw;
  }
`;

// Cabeçalho do modal
export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  font-weight: 500;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 0.375rem;
    margin-bottom: 1rem;
  }
`;

// Título do modal
export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Contêiner de status
export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: fit-content;
  margin-left: 0;

  @media (max-width: 768px) {
    gap: 0.375rem;
    padding: 0.375rem;
  }
`;

// Ponto de status
export const StatusDot = styled.span<{ status: "Ativo" | "Inativo" | "Sem Estoque" }>`
  width: 0.3125rem;
  height: 0.3125rem;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status === "Ativo" ? "#4FCACA" : status === "Inativo" ? "#FFC107" : "#FF4C4C"};

  @media (max-width: 768px) {
    width: 0.25rem;
    height: 0.25rem;
  }
`;

// Texto de status
export const StatusText = styled.span<{ status: "Ativo" | "Inativo" | "Sem Estoque" }>`
  font-size: 0.5625rem;
  color: ${({ status }) =>
    status === "Ativo" ? "#4FCACA" : status === "Inativo" ? "#FFC107" : "#FF4C4C"};

  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

// Contêiner de subtítulos
export const SubtitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

// Botão de subtítulo
export const SubtitleButton = styled.button<{ active: boolean }>`
  width: 17.1563rem;
  height: 3.25rem;
  padding: 1rem 0 0 0;
  border: 0;
  border-bottom: 1px solid ${({ active }) => (active ? "#4FCACA" : "#0F172A")};
  color: ${({ active }) => (active ? "#4FCACA" : "#0F172A")};
  font-size: 0.875rem;
  font-weight: ${({ active }) => (active ? "700" : "bold")};
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  background: transparent;

  @media (max-width: 768px) {
    width: 100%;
    height: 2.5rem;
    font-size: 0.75rem;
  }
`;

// Conteúdo principal do modal
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  flex: 1;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

// Título de seção
export const SectionTitle = styled.h3`
  font-size: 0.875rem;
  color: #344054;
  margin-left: 0;
  margin-bottom: 0.125rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

// Campo de entrada
export const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d0d5dd;
  border-radius: 0.5rem;
  color: #0f172a;
  background: transparent;
  font-size: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

// Contêiner de checkbox
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.375rem;
    margin-bottom: 0.5rem;
  }
`;

// Checkbox
export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 2px solid ${({ checked }) => (checked ? "#4FCACA" : "#D0D5DD")};
  border-radius: 50%;
  background-color: ${({ checked }) => (checked ? "#4FCACA" : "#FFFFFF")};
  cursor: pointer;
  position: relative;

  &:checked::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 0.625rem;
  }

  @media (max-width: 768px) {
    width: 0.75rem;
    height: 0.75rem;
  }
`;

// Label do checkbox
export const CheckboxLabel = styled.span`
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #0f172a;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

// Subtítulo de seção
export const SectionSubtitle = styled.h4`
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #0f172a;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
`;

// Componente de entrada
export const InputComponent = styled.input`
  border: 1px solid #d0d5dd;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: #667085;
  background: transparent;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
`;

// Contêiner de entrada com ícone
export const InputContainer = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #d0d5dd;
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;
  background: transparent;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

// Entrada com ícone
export const InputComponentWithIcon = styled.input`
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: #667085;
  background: transparent;
  border: none;
  outline: none;

  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
    background: transparent !important;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
`;

// Ícone de entrada
export const InputComponentIcon = styled.img`
  width: 0.5rem;
  height: 0.3125rem;
  margin-right: 0.625rem;
  align-self: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 0.4rem;
    height: 0.25rem;
  }
`;

// Campo de descrição
export const DescriptionInput = styled.div`
  border: 1px solid #d0d5dd;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: #667085;
  background: transparent;
  min-height: 6.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.75rem; 
  }
`;

// Contêiner de mídia
export const MediaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
// Placeholder de mídia
export const MediaPlaceholder = styled.div`
  width: 100%;
  height: 10.6875rem;
  border: 1px solid #eaecef;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667085;
  background: transparent;

  @media (max-width: 768px) {
    height: 8rem;
  }
`;

// Ícone de mídia
export const MediaIcon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  opacity: 0.6;

  @media (max-width: 768px) {
    width: 0.6rem;
    height: 0.6rem;
  }
`;

// Placeholder de upload
export const UploadPlaceholder = styled.div`
  border: 1px solid #d0d5dd;
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: #667085;
  text-align: center;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 11.25rem;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 1rem; 
    height: 8rem; 
  }
`;

// Ícone de upload
export const UploadIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    width: 1rem; 
    height: 1rem;
  }
`;

// Texto de upload
export const UploadText = styled.p`
  font-size: 0.875rem;
  max-width: 80%;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.75rem; 
  }
`;

// Botão de upload
export const UploadButton = styled.button`
  background: none;
  border: none;
  color: #2eb4b4;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem; 
  }
`;

// Rodapé do modal
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 0.5rem; 
    margin-top: 1rem; 
  }
`;

// Botão do rodapé
export const FooterButton = styled.button<{ primary?: boolean }>`
  width: 15.2813rem;
  height: 2.75rem;
  border: none;
  border-radius: 7.6875rem;
  background-color: ${({ primary }) => (primary ? "#4FCACA" : "#f4f4f4")};
  color: ${({ primary }) => (primary ? "#FFFFFF" : "#0F172A")};
  cursor: pointer;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    width: 100%; 
    height: 2.25rem; 
    font-size: 0.75rem; 
  }
`;