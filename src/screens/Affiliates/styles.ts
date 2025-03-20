import styled from "styled-components";

export const PageIndicateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background-color: ${({ active }) => (active ? "#4FCACA" : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "#000000")};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4fcaca;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 10px;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Vector = styled.img`
  width: 8px;
  height: 8px;
  margin-left: 8px;
`;

export const LowerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr 1fr;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 8px 12px;
  margin: 0;
  border-bottom: 0.77px solid #eaecf0;
  border-radius: 4px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DataRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 1.5fr 1fr 1fr;
  align-items: flex-start;
  text-align: center;
  width: 100%;
  padding: 8px 12px;
  margin: 0;
  border-radius: 4px;
  margin-top: 8px;

  @media (max-width: 768px) {
    display: block; /* Exibe os dados como bloco em telas menores */
    padding: 10px 0;
  }
`;

export const Filter = styled.text`
  font-size: 12px;
  font-weight: 400;
  color: #64748b;
  align-self: center;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ProductName = styled(Filter)`
  font-family: Inter;
  font-weight: 700;
  font-size: 12px;
  line-height: 15.44px;
  letter-spacing: 0%;
  color: #2392bb;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const FilterIcon = styled.img`
  width: 12px;
  height: 12px;
`;

export const FilterContainer = styled.button`
  display: flex;
  padding: 8px 12px;
  border-color: #dce1e9;
  background: none;
  border-radius: 4px;
  margin-left: auto;
  width: 209px;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    padding: 6px 10px;
  }
`;

export const WrapperFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PaginationButton = styled.button`
  width: 85.2415px;
  height: 28.3547px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6.18px;
  border-radius: 6.18px;
  border: 0.77px solid #dce1e9;
  background: none;
  padding: 6.18px 10.81px;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 10.81px;
  line-height: 15.44px;
  letter-spacing: 0%;
  color: #344054;

  &:hover {
    background-color: #f3f4f6;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 8px;
    font-size: 12px;
  }
`;

export const PageNumbersContainer = styled.div`
  display: flex;
  gap: 6.18px;
`;

export const PageNumberButton = styled(PaginationButton)`
  width: auto;
  height: auto;
  padding: 6.18px 8px;
  border: none;
`;

export const StyledButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? "#44ADD4" : "#ECF7FA")};
  color: ${(props) => (props.active ? "#FFFFFF" : "#44ADD4")};
  border: none;
  padding: 10px 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 153px;
  font-size: 12px;

  &:hover {
    background-color: ${(props) => (props.active ? "#44ADD4" : "#44ADD4")};
    color: ${(props) => (props.active ? "#ECF7FA" : "#FFFFFF")};
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 10px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 16px;
  margin-left: 32px;
  align-items: flex-start;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    flex-direction: column;
    gap: 12px;
  }
`;

export const StatusButton = styled.button<{ status: string }>`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  ${({ status }) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return `
          background-color: #5B9858;
          color: #FFFFFF;
        `;
      case "reprovado":
        return `
          background-color: #B91C1C;
          color: #FFFFFF;
        `;
      case "pendente":
        return `
          background-color: #FBBF24;
          color: #FFFFFF;
        `;
    }
  }}

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: transparent;
  color: #B91C1C;
  font-size: 12px;
  font-weight: 600;
  border: none;
  border-radius: 0;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #B91C1C;
  }

  &:focus {
    outline: none;
    color: #B91C1C;
  }

  &:active {
    color: #B91C1C;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

