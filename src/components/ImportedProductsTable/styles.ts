import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  text-align: left;
  border-collapse: collapse;

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
`;

export const THead = styled.thead`
  background-color: #f4f4f4;

  th {
    font-weight: bold;
  }
`;

export const TBody = styled.tbody``;

export const TR = styled.tr`
  background-color: #ffffff;
  border-bottom: 1px solid #eaecf0;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const TH = styled.th`
  font-size: 0.75rem;
  color: #667085;
  padding: 0.625rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.625rem;
    padding: 0.3125rem;
  }
`;

export const TD = styled.td`
  font-size: 0.75rem;
  color: #101828;
  padding: 0.625rem;

  @media (max-width: 768px) {
    font-size: 0.625rem;
    padding: 0.3125rem;
  }
`;

export const Checkbox = styled.input`
  margin-right: 0.3125rem;
`;

export const StatusIndicator = styled.span<{ status: "Ativo" | "Inativo" | "Sem Estoque" }>`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${({ status }) =>
    status === "Ativo" ? "#4FCACA" : status === "Inativo" ? "#FFC107" : "#FF4C4C"};
`;

export const StatusText = styled.span<{ status: "Ativo" | "Inativo" | "Sem estoque" }>`
  color: ${({ status }) =>
    status === "Ativo" ? "#4FCACA" : status === "Inativo" ? "#FFC107" : "#FF4C4C"};

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
`;

export const ProductNameContainer = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;

  span {
    font-weight: bold;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const DefaultCategoryText = styled.span`
  color: #667085;

  @media (max-width: 768px) {
    font-size: 0.625rem;
  }
`;
