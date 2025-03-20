import React, { useState } from "react";
import {
  Container,
  Image,
  ProductName,
  RangeInput,
  InfoText,
  MoreInfoButton,
} from "./styles";

interface StoreProductProps {
  imageUrl: string;
  productName: string;
  minRange: number;
  maxRange: number;
  category: string;
  producer: string;
  priceRange: string;
  onMoreInfoClick?: () => void;
}

const StoreProduct: React.FC<StoreProductProps> = ({
  imageUrl,
  productName,
  minRange,
  maxRange,
  category,
  producer,
  priceRange,
  onMoreInfoClick,
}) => {
  const [rangeValue, setRangeValue] = useState(minRange);

  return (
    <Container>
      <Image src={imageUrl} alt={productName} />
      <ProductName>{productName}</ProductName>
      <RangeInput
        type="range"
        min={minRange}
        max={maxRange}
        value={rangeValue}
        onChange={(e) => setRangeValue(Number(e.target.value))}
      />
      <InfoText>
        <strong>Categoria:</strong> {category}
      </InfoText>
      <InfoText>
        <strong>Produtor:</strong> {producer}
      </InfoText>
      <InfoText>
        <strong>Preço:</strong> {priceRange}
      </InfoText>
      <MoreInfoButton onClick={onMoreInfoClick}>Mais informações</MoreInfoButton>
    </Container>
  );
};

export default StoreProduct;
