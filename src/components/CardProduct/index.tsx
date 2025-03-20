import ProdutoPng from '../../assets/icons/produto.png';
import {
    Code,
    CodeContainer,
    Container,
    Content,
    Image,
    MoreInfoContainer,
    MoreText,
    Title
} from "./styles";
import { PropsHeader } from "./types";



const CardProduct = ({ onClickProduct, darkMode}: PropsHeader) => {


  return (
    <Container >
<Content>
    <Image src={ProdutoPng}/>
<Title>100 Rugas</Title>

    <CodeContainer>
        <Code>pro6ym1n</Code>
    </CodeContainer>

    <MoreInfoContainer>
        <MoreText>Mais informações</MoreText>
    </MoreInfoContainer>
</Content>
    </Container>
  );
};

export default CardProduct;
