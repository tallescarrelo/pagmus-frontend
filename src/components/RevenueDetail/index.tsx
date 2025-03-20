import revenueIcon from "../../assets/icons/revenue3x.png";
import revenueIconDark from "../../assets/icons/revenueDarkl.png";

import {
    Container,
    DetailContainer,
    Icon,
    Status,
    Title,
    Value,
} from "./styles";
import { PropsRevenueDetails } from "./types";

const RevenueDetail = ({
  title,
  value,
  percentage,
  darkMode = true, 
}: PropsRevenueDetails & { darkMode?: boolean }) => {
  return (
    <Container >
      <Icon src={darkMode ? revenueIconDark : revenueIcon} alt="Revenue icon" />

      <DetailContainer>
        <Title>{title}</Title>
        <Value>R$ {value}</Value>
        <Status>{percentage} % Último mês</Status>
      </DetailContainer>
    </Container>
  );
};

export default RevenueDetail;
