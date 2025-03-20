
import { CloseIconContainer, Container, Header, StatusContainer, StatusDot, StatusText, Title, CloseIcon, WrapperHeader, StepContainer, StepTitle, StepNumber, InputContainer, InputLabel, Input, Textarea, Select, DropZoneContainer, DropZoneIcon, DropZoneText, ButtonsContainer, Button, PlaceholderOption } from './styles';
import Dot from '../../../assets/icons/_Dot@2x.png';
import Close from '../../../assets/icons/closeIcon.png';
import UploadCloud from '../../../assets/icons/upload-cloud@2x.png';
import {useDropzone} from 'react-dropzone';

const StepOne = ({ onNext }) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

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
        <StepTitle >Detalhe do produto</StepTitle>
        <StepNumber>Etapa 1/4</StepNumber>
      </StepContainer>
      
      <InputContainer>
        <InputLabel >Nome</InputLabel>
        <Input placeholder="Digite o nome do produto"></Input>
      </InputContainer>

      <InputContainer>
        <InputLabel>Descrição</InputLabel>
        <Textarea  placeholder="Digite a descrição do produto"></Textarea>
      </InputContainer>

       <InputContainer>
        <InputLabel >Categoria</InputLabel>
        <Select>
          <PlaceholderOption>Selecione uma categoria</PlaceholderOption>
            <option value="1">Administração e Negócios</option>
            <option value="2">Animais de Estimação</option>
            <option value="3">Arquitetura e Engenharia</option>
            <option value="4">Artes e Música</option>
            <option value="5">Autoajuda e Desenvolvimento Pessoal</option>
            <option value="6">Automóveis</option>
            <option value="7">Blogs e Redes Sociais</option>
            <option value="8">Casa e Jardinagem</option>
            <option value="9">Culinária, Gastronomia, Receitas</option>
            <option value="10">Design e Templates PSD, PPT ou HTML</option>
            <option value="11">Edição de Áudio, Vídeo ou Imagens</option>
            <option value="12">Educacional, Cursos Técnicos e Profissionalizantes</option>
            <option value="13">Entretenimento, Lazer e Diversão</option>
            <option value="14">Esportes e Fitness</option>
            <option value="15">Filmes e Cinema</option>
            <option value="16">Geral</option>
            <option value="17">Histórias em Quadrinhos</option>
            <option value="18">Idiomas</option>
            <option value="19">Informática</option>
            <option value="20">Internet Marketing</option>
            <option value="21">Investimentos e Finanças</option>
            <option value="22">Jogos de Cartas, Poker, Loterias</option>
            <option value="23">Jogos de Computador, Jogos Online</option>
            <option value="24">Jurídico</option>
            <option value="25">Literatura e Poesia</option>
            <option value="26">Marketing de Rede</option>
            <option value="27">Marketing e Comunicação</option>
            <option value="28">Meio Ambiente</option>
            <option value="29">Música, Bandas e Shows</option>
            <option value="30">Paquera, Sedução e Relacionamentos</option>
            <option value="31">Plugins, Widgets e Extensões</option>
            <option value="32">Produtividade e Organização Pessoal</option>
            <option value="33">Relatórios, Artigos e Pesquisas</option>
            <option value="34">Religião e Crenças</option>
            <option value="35">Romances, Dramas, Estórias e Contos</option>
            <option value="36">RPG e Jogos de Mesa</option>
            <option value="37">Saúde, Bem-estar e Beleza</option>
            <option value="38">Scripts</option>
            <option value="39">Segurança do Trabalho</option>
            <option value="40">Sexologia e Sexualidade</option>
            <option value="41">Snippets (Trechos de Vídeo)</option>
            <option value="42">Turismo</option>
            <option value="43">Pessoas com deficiência</option>
            <option value="44">Moda e vestuário</option>
            <option value="45">Produtos infantis</option>
        </Select>
      </InputContainer>

      <InputContainer>
        <InputLabel>Tags</InputLabel>
        <Input  placeholder="Digite o nome do produto"></Input>
      </InputContainer>

        <InputContainer>
          <InputLabel >Selecione o Formato *</InputLabel>
          <Select>
            <option value="physical-product">Produto Físico</option>
            <option value="digital-product">Produto Digital</option>
          </Select>
        </InputContainer>

        
        
        <InputContainer><InputLabel style={{marginBottom: "-20px"}}>Imagem do Produto</InputLabel></InputContainer>
        <DropZoneContainer {...getRootProps({className: 'dropzone'})}> 
        
        <DropZoneIcon src={UploadCloud}/>
        <input {...getInputProps()} />
        <DropZoneText> <span style={{ color: "#2EB4B4" }}>Clique aqui</span> ou arraste o arquivo </DropZoneText>
        <DropZoneText>SVG, PNG, JPG or GIF (max. 800x400px) </DropZoneText>
        <ul>{files}</ul>
        </DropZoneContainer>

        <ButtonsContainer>
          <Button variant="primary" onClick={() => {}}>Cancelar</Button>
          <Button variant="continue" onClick={onNext} >Próximo</Button>
        </ButtonsContainer>
          
    </Container>
  );
}

export default StepOne;