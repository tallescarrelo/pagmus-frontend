import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(138.5deg, #44ADD4 41.88%, #FFFFFF 99.69%);
  position: relative;
  overflow: hidden;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1200px;
`;

export const RecoverPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  margin: 20px;

  @media (max-width: 768px) {
    padding: 30px;
    margin: 15px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 10px;
  }
`;

export const Title = styled.h1`
  font-family: "Nunito", sans-serif;
  font-size: 25px;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
  color: #030229;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-top: 15px;
  }
`;

export const Logo = styled.img`
  width: 282px;
  height: auto; 
  margin-bottom: 60px;

  @media (max-width: 768px) {
    width: 180px;
    margin-bottom: 38px;
  }

  @media (max-width: 480px) {
    width: 150px;
    margin-bottom: 30px;
  }
`;


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  max-width: 400px;
  height: auto;
  opacity: 0.3;
  z-index: 1;

  @media (max-width: 768px) {
    width: 60%;
  }

  @media (max-width: 480px) {
    width: 80%;
  }
`;