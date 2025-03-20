import { Container, Label, SeparatorVertical } from "./styles";
import { PropsPageIndicate } from "./type";

const PageIndicate = ({ title, mb, mt, darkMode }: PropsPageIndicate) => {
  return (
    <Container mb={mb} mt={mt}>
      <SeparatorVertical />
      <Label >{title}</Label>
    </Container>
  );
};

export default PageIndicate;
