import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonLarge, Input,} from "../../components";

import {default as hideIcon, default as showIcon} from "../../assets/icons/Hide1x.png";
import logoLarge from "../../assets/logo/pagmusmain.png";
import Account from "../../services/api/index";
import {AskLabel, CheckBox, CheckBoxContainer, Container, Content, CreateAccountContainer, FormContainer, GradientBackground, ImageBackground, Logo, LogoSignIn,RememberPasswordContainer,RememberPasswordLabel, ResetPasswordLabel,SignInContainer,Title} from "./styles";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const handleSuccess = async (data) => {
  const { access_token } = data;

  if (!access_token) {
    console.error("Token de acesso não encontrado nos dados retornados:", data);
    return;
  }
  // await Auth.authenticate({ token: access_token });

  navigate("/Home");
};


  const handleSubmit = async () => {
    const credentials = { email, password };
    console.log("clicou", credentials);

    try {
      const data = await Account.login(credentials);
      await handleSuccess(data);
      navigate("/Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Content>
        <SignInContainer>
          <Logo src={logoLarge} />
  
          <Title>Área restrita</Title>
  
          <FormContainer>
            <Input
              mt={30}
              label="Email"
              placeholder="example@gmail.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Input
                mt={20}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? hideIcon : showIcon}
                alt="Toggle Password Visibility"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "20px",
                  cursor: "pointer",
                }}
              />
            </div>
          </FormContainer>
  
          <RememberPasswordContainer>
            <CheckBoxContainer>
              <CheckBox type="checkbox" />
              <RememberPasswordLabel>Remember me</RememberPasswordLabel>
            </CheckBoxContainer>
            <Link to="/recover-password">
              <ResetPasswordLabel>Esqueci minha senha</ResetPasswordLabel>
            </Link>
          </RememberPasswordContainer>
  
          <ButtonLarge label="LogIn" mt={40} onClick={handleSubmit} />
  
          <CreateAccountContainer>
            <AskLabel>Ainda não possui conta?</AskLabel>
            <Link to="/signup">
              <Button label="Cadastre-se" backgroundColor="transparent" color="#44ADD4" />
            </Link>
          </CreateAccountContainer>

        </SignInContainer>
        
        <GradientBackground />
      </Content>
    </Container>
  );
};

export default SignIn;
