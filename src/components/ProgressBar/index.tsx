import {
    Container,
    Progress,
    ProgressBarContainer,
    ProgressBarValue,
    ProgressText,
} from "./styles";
import { PropsProgressBar } from "./types";

const ProgressBar = ({ type, value, title, darkMode }: PropsProgressBar) => {
  return (
    <Container>
      <ProgressBarContainer>
        <ProgressText >{title}</ProgressText>

        <ProgressBarValue type={type}>{value}</ProgressBarValue>
      </ProgressBarContainer>

      <Progress type={type} />
    </Container>
  );
};

export default ProgressBar;
