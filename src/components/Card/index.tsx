import React from 'react';
import { CardContainer, Title, Value, Change, Details } from './styles';


interface CardProps {
  title: string;
  value: string;
  change?: string;
  details?: string;
}

const Card: React.FC<CardProps> = ({ title, value, change, details }) => {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <Value>{value}</Value>
      {change && <Change change={change}>{change}</Change>}
      {details && <Details>{details}</Details>}
    </CardContainer>
  );
};

export default Card;
