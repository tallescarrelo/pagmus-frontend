import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { GraphCardContainer, GraphTitle, GraphValue, GraphDetails } from './styles';

interface CardWithGraphProps {
  title: string;
  value: string;
  details: string;
  data: any[]; // Dados do gráfico
  dataKey: string; // Chave dos dados para o eixo Y
  stroke: string; // Cor da linha do gráfico
}

const CardWithGraph: React.FC<CardWithGraphProps> = ({ title, value, details, data, dataKey, stroke }) => {
  return (
    <GraphCardContainer>
      {/* Título */}
      <GraphTitle>{title}</GraphTitle>

      {/* Valor Principal */}
      <GraphValue>{value}</GraphValue>

      {/* Detalhes */}
      <GraphDetails>{details}</GraphDetails>

      {/* Gráfico Responsivo */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={stroke} />
        </LineChart>
      </ResponsiveContainer>
    </GraphCardContainer>
  );
};

export default CardWithGraph;