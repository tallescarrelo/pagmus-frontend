import React, { useState } from "react";
import backgroundLogo from "../../assets/icons/login_background.png";
import logoLarge from "../../assets/logo/pagmusmain.png";
import { Button, ButtonLarge, Input } from "../../components";
import Account from "../../services/api/index";
import {
  CheckBox,
  CheckBoxContainer,
  CheckBoxLabel,
  Container,
  Content,
  CreateAccountButton,
  FormContainer,
  ImageBackground,
  Logo,
  SignInLink,
  SignUpContainer,
  Title,
  GradientBackground
} from "./styles";

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [clientId, setClientId] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const handleCreateAccount = async () => {
    const userDetails = {
      name: username,
      email,
      password,
    };

    try {
      const response = await Account.register(userDetails);

      if (response.status === 201) {
        console.log("User registered successfully");
      }
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <Container>
      <Content>
        <SignUpContainer>
          <Logo src={logoLarge} />
          <Title>Cadastro</Title>

          <FormContainer>
            <Input
              mt={30}
              label="Nome"
              placeholder="Digite seu nome completo"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Input
              mt={20}
              label="CPF/CNPJ"
              placeholder="Digite seu CPF ou CNPJ"
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />

            <Input
              mt={20}
              label="Telefone"
              placeholder="Digite seu telefone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              mt={20}
              label="Email"
              placeholder="example@gmail.com"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              mt={20}
              label="Digite uma senha"
              placeholder="************"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              mt={20}
              label="Repita a senha"
              placeholder="************"
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />

            <CheckBoxContainer>
              <CheckBox
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <CheckBoxLabel>
                Estou de acordo com os
                <a
                  href="/terms"
                  style={{ textDecoration: "underline", color: "#44ADD4" }}
                >
                  {" "} Termos de uso {" "}
                </a>
                e a
                <a
                  href="/privacy"
                  style={{ textDecoration: "underline", color: "#44ADD4" }}
                >
                  {" "} Política de Privacidade.
                </a>
                .
              </CheckBoxLabel>
            </CheckBoxContainer>

            <CreateAccountButton>
              <ButtonLarge
                label="Criar sua conta"
                mt={40}
                onClick={handleCreateAccount}
              />
            </CreateAccountButton>

            <SignInLink>
              Já possui conta?
              <Button
                label="Acessar agora"
                backgroundColor="transparent"
                color="#44ADD4"
                fontSize={16}
              />
            </SignInLink>
          </FormContainer>
        </SignUpContainer>
        <GradientBackground>
        </GradientBackground>
      </Content>
    </Container>
  );
};

export default SignUp;
