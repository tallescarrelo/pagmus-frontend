import React from "react";
import { 
  CardContainer,
  CardHeader,
  CardTitle,
  CardDescription,
  CardActions,
  IconPlaceholder,
  ThreeDotsButton
} from "./styles";

interface IntegrationCardProps {
  integration: {
    name: string;
    description: string;
  };
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
  return (
    <CardContainer>
      <CardActions>
        <IconPlaceholder />
        <ThreeDotsButton>&#8942;</ThreeDotsButton>
      </CardActions>
      <CardHeader>
        <CardTitle>{integration.name}</CardTitle>
        <CardDescription>{integration.description}</CardDescription>
      </CardHeader>
    </CardContainer>
  );
};

export default IntegrationCard;
