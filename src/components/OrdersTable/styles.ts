import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  text-align: left;
  border-collapse: collapse;
`;

export const THead = styled.thead`
  background-color: #f4f4f4;
`;

export const TBody = styled.tbody``;

export const TR = styled.tr`
  background-color:  ${props => props.theme.colors.trBackground};
  border-bottom: 1px solid  ${props => props.theme.colors.trBorder};
`;

export const TH = styled.th`
  font-size: 12px;
  color:${props => props.theme.colors.thColor};
  padding: 10px;
  text-align: left;
`;

export const TD = styled.td`
  font-size: 12px;
  color: #667085;
  padding: 10px;
  &:first-child {
    color: #000;
    font-weight: bold;
  }
`;

export const Checkbox = styled.input`
  margin-right: 5px;
`;

export const StatusIndicator = styled.span<{ status: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${({ status }) =>
    status === "Pagamento pendente"
      ? "#B54708"
      : status === "Pago"
      ? "#344054"
      : status === "Não processado"
      ? "#C4320A"
      : status === "Processado"
      ? "#4FCACA"
      : "#101828"};
`;

export const PaymentStatus = styled.span<{ status: string }>`
  color: ${({ status }) =>
    status === "Pagamento pendente"
      ? "#B54708"
      : status === "Pago"
      ? "#344054"
      : "#101828"};
`;

export const ProcessingStatus = styled.span<{ status: string }>`
  color: ${({ status }) =>
    status === "Não processado"
      ? "#C4320A"
      : status === "Processado"
      ? "#4FCACA"
      : "#101828"};
`;

export const Tag = styled.span`
  background-color: #344054;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 4px;
  font-size: 12px;
  display: inline-block;
`;