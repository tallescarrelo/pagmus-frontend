import React, { useState } from "react";
import logoLarge from "../../assets/logo/pagmusmain.png";
import { ButtonLarge, Input } from "../../components"; 
import backgroundLogo from "../../assets/logo/backgroundlogo.png";
import {
  BackgroundImage,
    Container,
    Content,
    FormContainer,
    Logo,
    RecoverPasswordContainer,
    Title,
} from "./styles";

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleRecoverPassword = () => {
    console.log("Recuperar senha para:", email);
  };

  return (
    <Container> 
      
      <Content>
      <BackgroundImage src={backgroundLogo} alt="Imagem Central" /> 
        <RecoverPasswordContainer>
          <Logo src={logoLarge} />
          <Title>Recuperar Senha</Title>

          <FormContainer>
            <Input
              mt={30}
              label="Digite seu email"
              placeholder="example@gmail.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <ButtonLarge
              label="Resgatar minha senha"
              mt={40}
              onClick={handleRecoverPassword}
            />
          </FormContainer>
        </RecoverPasswordContainer>
        
      </Content>
    </Container>
  );
};

export default RecoverPassword;
