import { useState } from 'react';
import { 
  CloseIconContainer, Container, Header, StatusContainer, StatusDot, StatusText, Title, 
  CloseIcon, WrapperHeader, StepContainer, StepTitle, StepNumber, 
  SwitchContainer, SwitchText, StyledSwitch, ButtonsContainer, Button,
  InputContainer,
  InputLabel,
  Select,
  PlaceholderOption,
  Input,
  LowerText,
  RadioButtonContainer,
  RadioButton,
  RadioButtonLabel,
  InputValueComission
} from './styles';

import Dot from '../../../assets/icons/_Dot@2x.png';
import Close from '../../../assets/icons/closeIcon.png';

const StepFour = ({ onBack, onNext }) => {
  const [isOn, setIsOn] = useState(false);
  const [storeVisible, setStoreVisible] = useState(false);
  const [autoAprove, setAutoAprove] = useState(false);
  const [acessBuyerData, setAcessBuyerData] = useState(false);
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
        <StepNumber>Etapa 4/4</StepNumber>
      </StepContainer>

      {/* PRIMEIRA PARTE */}
      <SwitchContainer>
        <SwitchText>Participar do Programa de Afiliados?</SwitchText>
        <StyledSwitch checked={isOn} onClick={() => setIsOn(!isOn)} />
      </SwitchContainer> 

      {/* SEGUNDA PARTE */}
      {isOn && (
        <>

          <SwitchContainer>
            <SwitchText>Visível na Loja?</SwitchText>
            <StyledSwitch checked={storeVisible} onClick={() => setStoreVisible(!storeVisible)} />
          </SwitchContainer>
            
          <SwitchContainer>
            <SwitchText>Aprovação automática?</SwitchText>
            <StyledSwitch checked={autoAprove} onClick={() => setAutoAprove(!autoAprove)} />
          </SwitchContainer>

          <SwitchContainer>
            <SwitchText>Acesso aos dados do comprador?</SwitchText>
            <StyledSwitch checked={acessBuyerData} onClick={() => setAcessBuyerData(!acessBuyerData)} />
          </SwitchContainer>
            
          <InputContainer>
            <InputLabel >Tempo do Cookie*</InputLabel>
            <Select>
              <PlaceholderOption>Selecione o tempo dos cookies</PlaceholderOption>
              <option value="forever">Eterno</option>
              <option value="30days">30 dias</option>
              <option value="60days">60 dias</option>
              <option value="90days">90 dias</option>
              <option value="120days">120 dias</option>
              <option value="other">Outro</option>
            </Select>
          </InputContainer>

          <InputContainer>
            <InputLabel >Valor do Cookie</InputLabel>
            <Input placeholder="Digite o valor do tempo de Cookie"></Input>
          </InputContainer>

          <InputContainer>
            <InputLabel >Tipo de comissionamento</InputLabel>
            <Select>
              <PlaceholderOption>Selecione o tipo de comissionamento</PlaceholderOption>
              <option value="firstClick">Primeiro Clique</option>
              <option value="lastClick">Último Clique</option>
            </Select>
          </InputContainer>

          <RadioButtonContainer>
            <RadioButton 
              type="radio"
              value="percentage"
              checked={selectedOption === "percentage"}
              onChange={(e) => setSelectedOption(e.target.value)}
            /> 
            <RadioButtonLabel>Porcetagem</RadioButtonLabel>

          </RadioButtonContainer>

          <RadioButtonContainer>
            <RadioButton 
              type="radio"
              value="fix-value"
              checked={selectedOption === "fix-value"}
              onChange={(e) => setSelectedOption(e.target.value)}
            /> 
            <RadioButtonLabel>Valor fixo</RadioButtonLabel>
          </RadioButtonContainer>

          <InputContainer>
            <InputValueComission placeholder="Valor da Comissão"></InputValueComission>
          </InputContainer>

        </> 
      )}
      
    
      <ButtonsContainer>
        <Button onClick={onBack} variant="primary">Voltar</Button>
        <Button onClick={onNext} variant="continue" disabled={!isOn}>
          Finalizar Cadastro
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default StepFour;
