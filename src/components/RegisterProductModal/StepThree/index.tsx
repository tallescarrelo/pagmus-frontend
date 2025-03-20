
import { CloseIconContainer, Container, Header, StatusContainer, StatusDot, StatusText, Title, CloseIcon, WrapperHeader, StepContainer, StepTitle, StepNumber, InputContainer, InputLabel, Input,ButtonsContainer, Button, StyledSwitch, SwitchContainer, SwitchText, LowerText, Select, PlaceholderOption  } from './styles';
import Dot from '../../../assets/icons/_Dot@2x.png';
import Close from '../../../assets/icons/closeIcon.png';
import { useState } from 'react';

const StepThree = ({ onBack, onNext }) => {
    
    const [isPacFree, setPacFree] = useState(false);
    const [isSedex, setIsSedex] = useState (false);

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
          <StepTitle >Configurações de venda</StepTitle>
          <StepNumber>Etapa 3/4</StepNumber>
        </StepContainer>
        
        <InputContainer>
          <InputLabel >Cep de origem *</InputLabel>
          <Input placeholder="Digite o CEP de origem"></Input>
          <LowerText>Digite o CEP de onde o produto será enviado</LowerText>
        </InputContainer>

        <InputContainer>
          <InputLabel >Tipo de frete *</InputLabel>
          <Select>
            <PlaceholderOption>Selecione o tipo de frete</PlaceholderOption>
            <option value="frete1">Frete fixo</option>
            <option value="frete2">Frete variável ou grátis</option>
          </Select>
        </InputContainer>

        <SwitchContainer>
            <SwitchText>PAC grátis?</SwitchText>
            <StyledSwitch checked={isPacFree} onClick={() => setPacFree(!isPacFree)} />
        </SwitchContainer>  

        <SwitchContainer>
            <SwitchText>Aceita SEDEX?</SwitchText>
            <StyledSwitch checked={isSedex} onClick={() => setIsSedex(!isSedex)} />
        </SwitchContainer> 

        <InputContainer>
          <InputLabel >Valor padrão do frete</InputLabel>
          <Input placeholder="Digite o valor padrão do frete"></Input>
          <LowerText>Para evitar perder vendas quando o cálculo de frete dos Correios falhar, defina um valor padrão para essas situações.</LowerText>
        </InputContainer>  

        <ButtonsContainer>
            <Button variant="primary" onClick={onBack}>Cancelar</Button>
            <Button variant="continue" onClick={onNext} >Próximo</Button>
        </ButtonsContainer>

       

    </Container>
  );
}

export default StepThree;