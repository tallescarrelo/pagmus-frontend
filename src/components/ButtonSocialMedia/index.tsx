import { PropsButtonSocialMedia } from "./types";
import { Container, Icon } from "./styles";

const ButtonSocialMedia = ({ icon, label }: PropsButtonSocialMedia) => {
  return (
    <Container>
      <Icon src={icon} />
      {label}
    </Container>
  );
};

export default ButtonSocialMedia;
