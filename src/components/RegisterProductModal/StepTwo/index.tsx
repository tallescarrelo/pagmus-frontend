import { useState } from 'react';
import { 
  CloseIconContainer, Container, Header, StatusContainer, StatusDot, StatusText, Title, 
  CloseIcon, WrapperHeader, StepContainer, StepTitle, StepNumber, InputContainer, 
  InputLabel, Input, ButtonsContainer, Button, SellContainer, StyledSwitch, SellText, 
  RadioButtonContainer,
  RadioButton,
  RadioButtonLabel,
  LowerText
} from './styles';

import Dot from '../../../assets/icons/_Dot@2x.png';
import Close from '../../../assets/icons/closeIcon.png';

const StepTwo = ({ onBack, onNext }) => {
  const [isOn, setIsOn] = useState(false);
  const [isStepTwoOne, setIsStepTwoOne] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");


  return (
    <Container>
      <WrapperHeader>
        <Header>
          <Title>Cadastro de Produto</Title>
          <StatusContainer> 
            <StatusDot src={Dot} />
            <StatusText>Ativo</StatusText>
          </StatusContainer>
        </Header>

        <CloseIconContainer onClick={() => {}}>
          <CloseIcon src={Close} />
        </CloseIconContainer>
      </WrapperHeader>

      <StepContainer>
        <StepTitle>Configurações de venda</StepTitle>
        <StepNumber>Etapa {isStepTwoOne ? '2' : '2'}/4</StepNumber>
      </StepContainer>

      {!isStepTwoOne ? (
        // PRIMEIRA PARTE DO STEP 2
        <>
    
        <SellContainer>
            <SellText>Disponível para a venda?</SellText>
            <StyledSwitch checked={isOn} onClick={() => setIsOn(!isOn)} />
        </SellContainer>   

        <InputContainer>
          <InputLabel >Tempo de garantia</InputLabel>
          <Input placeholder="Digite o tempo de garantia"></Input>
        </InputContainer>

        <InputContainer>
          <InputLabel >Url da página de vendas</InputLabel>
          <Input placeholder="Digite a URL da página de vendas"></Input>
        </InputContainer>

        <InputContainer>
          <InputLabel >Url da página de obrigado</InputLabel>
          <Input placeholder="Digite a URL da página de obrigado"></Input>
        </InputContainer>

        <InputContainer>
          <InputLabel >Url da página do reclame aqui</InputLabel>
          <Input placeholder="Digite a URL da página do Reclame Aqui"></Input>
        </InputContainer>

        <InputContainer>
          <InputLabel >Email de suporte</InputLabel>
          <Input placeholder="Digite o E-mail de suporte"></Input>
        </InputContainer>

        <ButtonsContainer>
            <Button variant="primary" onClick={onBack}>Cancelar</Button>
                {isStepTwoOne ? (
                  <Button variant="continue" onClick={onNext}>Próximo</Button> 
                ) : (
                <Button variant="continue" onClick={() => setIsStepTwoOne(true)}>Próximo</Button>
              )}
          </ButtonsContainer>
        
        </>
      ) : (

        // SEGUNDA PARTE (Step 2.1)
        <>

          <RadioButtonContainer>
            <RadioButton 
              type="radio"
              value="box-package"
              checked={selectedOption === "box-package"}
              onChange={(e) => setSelectedOption(e.target.value)}
            /> 
            <RadioButtonLabel>Caixa/pacote</RadioButtonLabel>

          </RadioButtonContainer>

          <RadioButtonContainer>
            <RadioButton 
              type="radio"
              value="roller-prism"
              checked={selectedOption === "roller/prism"}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <RadioButtonLabel>Rolo/prisma</RadioButtonLabel>
            </RadioButtonContainer>
          

          <InputContainer>
            <InputLabel>Altura (A)*</InputLabel>
            <Input placeholder="Digite a altura" />
            <LowerText>Em centímetros. Máximo 105cm e mínimo 2cm.</LowerText>
          </InputContainer>

          <InputContainer>
            <InputLabel>Largura (L)*</InputLabel>
            <Input placeholder="Digite a largura" />
            <LowerText>Em centímetros. Máximo 105cm e mínimo 16cm.</LowerText>
          </InputContainer>

          <InputContainer>
            <InputLabel>Comprimento (C)*</InputLabel>
            <Input placeholder="Digite o comprimento" />
            <LowerText>Em centímetros. Máximo 105cm e mínimo 11cm.</LowerText>
          </InputContainer>

          <InputContainer>
            <InputLabel>Peso (Kg)*</InputLabel>
            <Input placeholder="Digite o peso" />
            <LowerText>O peso deve ser entre 0.010Kg - 30.000Kg</LowerText>
          </InputContainer>

          <ButtonsContainer>
            {isStepTwoOne ? (
              <Button variant="primary" onClick={() => setIsStepTwoOne(false)}>Voltar</Button>
            ) : (
              <Button variant="primary" onClick={onBack}>Cancelar</Button>
            )}

            {isStepTwoOne ? (
              <Button variant="continue" onClick={onNext}>Próximo</Button>
            ) : (
              <Button variant="continue" onClick={() => setIsStepTwoOne(true)}>Próximo</Button>
            )}
          </ButtonsContainer>
         
        </>
      )}
    </Container>
  );
};

export default StepTwo;
