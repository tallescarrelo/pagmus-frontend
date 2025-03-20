import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: stretch; /* Mantém alinhado */
`;


export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  width: 30%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

  @media (max-width: 768px) {
    width: 100%; 
    padding: 20px;
  }
`;

export const LogoSignIn = styled.div`
  display: flex;
  background-color: #eeeeee;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  width: 282px;
  height: 47px;

  @media (max-width: 768px) {
    width: 150px; 
    height: auto;
  }
`;

export const Title = styled.h1`
  font-family: "Nunito", sans-serif;
  font-size: 25px;
  font-weight: 600;
  margin-top: 90px;
  text-align: center; 
  color: #030229;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: 50px; 
  }
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column; 
    gap: 10px; 
  }
`;

export const SeparatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 14px 0 14px;
  width: 100%;
  margin-top: 36px;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: flex-start; 
    gap: 10px; 
  }
`;

export const Label = styled.span`
  color: #030229;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 14px; 
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 100%; 
  }
`;

export const RememberPasswordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: flex-start;
    gap: 10px;
  }
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckBox = styled.input`
  margin-right: 10px;
  accent-color: #44ADD4; 
`;

export const RememberPasswordLabel = styled.p`
  color: #030229;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px; 
  }
`;

export const ResetPasswordLabel = styled.p`
  color: #44ADD4;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px; 
  }
`;

export const CreateAccountContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: flex-start; 
    gap: 10px; 
  }
`;

export const AskLabel = styled.p`
  color: #030229;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 14px; 
  }
`;

export const ImageBackground = styled.img`
  display: flex;

  @media (min-width: 768px) {
    display: block; 
    flex: 1;
    object-fit: cover;
  }
`;

export const GradientBackground = styled.div`
  flex: 1; 
  background: linear-gradient(138.5deg, #44ADD4 41.88%, #FFFFFF 99.69%);
  height: 100vh;

  @media (max-width: 768px) {
    display: none; 
  }
`;
