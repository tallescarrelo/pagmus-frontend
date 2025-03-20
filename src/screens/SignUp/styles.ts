import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh; 
  flex-direction: column; 

  @media (min-width: 768px) {
    flex-direction: row; 
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  background-color: #eeeeee;

  @media (min-width: 768px) {
    flex: 1; 
  }
`;

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px; 
  width: 100%; 
  height: auto; 
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    width: 30%; 
    height: 100%; 
    padding: 50px; 
  }
`;

export const Title = styled.h1`
  font-family: "Nunito", sans-serif;
  font-size: 20px; 
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
  color: #030229;

  @media (min-width: 768px) {
    font-size: 25px; 
  }
`;

export const Logo = styled.img`
  width: 150px; 
  height: auto; 
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 193px; 
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;

  @media (min-width: 768px) {
    width: 80%; 
  }
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

export const CheckBox = styled.input`
  margin-right: 10px;
  accent-color: #4fcaca;
`;

export const CheckBoxLabel = styled.p`
  color: #030229;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 12px; 
  }
`;

export const CreateAccountButton = styled.button`
  padding: 12px 24px;
  background-color: #fff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const SignInLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  font-family: Nunito;
  font-size: 16px;
  font-weight: 400;
  line-height: 21.82px;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Button = styled.button`
  color: #4fcaca;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #3ba7a7;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ImageBackground = styled.img`
  display: none;

  @media (min-width: 768px) {
    display: block;
    flex: 1;
    object-fit: cover;
  }
`;

export const GradientBackground = styled.div`
  flex: 1; 
  background: linear-gradient(138.5deg, #44ADD4 41.88%, #FFFFFF 99.69%);
  height: 100%;
 

  @media (max-width: 768px) {
    display: none; 
  }
`;