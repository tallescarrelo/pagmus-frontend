import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import brazil from "../../assets/icons/Brazil1x.png";
import mail from "../../assets/icons/mail1x.png";
import Moon from "../../assets/icons/moon.png";
import notify from "../../assets/icons/notify.png";
import Sun from "../../assets/icons/sun.png";
import visibility from "../../assets/icons/visibility1x.png";
import logo from "../../assets/logo/Pagmuslogo@2x.png";
import LogoWhite from "../../assets/logo/Pagmuslogo@2x.png";
import { selectUser } from "../../services/reducers/User";
import Button from "../Button";
import IntegrationButtons from "../IntegrationButtons";
import {
  Avatar,
  ButtonNotify,
  Container,
  Content,
  FunctionalitiesContainer,
  IconNofity,
  ImportsContainer,
  Logo,
  SeparatorVertical,
  UserName,
  WrapperButton,
} from "./styles";
import { PropsHeader } from "./types";

const Header = ({ onClickProduct, darkMode, changeTheme, showIntegrationButtons  }: PropsHeader) => {
  const navigate = useNavigate();
  const buttonData = [
    { icon: darkMode ? Moon : Sun },
    { icon: visibility },
    { icon: notify },
    { icon: mail },
    { icon: brazil },
  ];
  
  const user = useSelector(selectUser);
  console.log('user', user)

  return (
    <Container >
      <Logo
        src={darkMode ? LogoWhite : logo}
        alt={darkMode ? "Logo branca" : "Logo padrão"}
        
      />
      <SeparatorVertical />

      <Content>
        <FunctionalitiesContainer>
          
            <Button label="Inicio" onClick={() => navigate("/Home")} />
          {/*
            <Button label="Loja" onClick={() => navigate("/store")} />
            <Button label="Produtos" onClick={() => navigate("/product")} />
            <Button label="Afiliados" onClick={() => navigate("/afiliados")}/>
          */}
        </FunctionalitiesContainer>

        <ImportsContainer>
          {showIntegrationButtons && <IntegrationButtons />}
          <WrapperButton />

          {buttonData.map((button, index) => (
            <ButtonNotify key={index}  onClick={changeTheme}>
              <IconNofity src={button.icon} />
            </ButtonNotify>
          ))}

          <Avatar src={"https://github.com/pauloabrantesii.png"} />
          <UserName>Paulo Abrantes</UserName>
        </ImportsContainer>
      </Content>
    </Container>
  );
};

export default Header;
