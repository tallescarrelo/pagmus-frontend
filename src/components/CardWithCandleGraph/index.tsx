import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { GraphCardContainer, GraphTitle, GraphValue, GraphDetails } from './styles';

interface CardWithCandleGraphProps {
  title: string;
  value: string;
  details: string;
  data: Array<{ name: string; [key: string]: any }>; // Dados do gráfico
  dataKey: string; // Chave dos dados para o gráfico
  colors: string[]; // Cores das barras
}

const CardWithCandleGraph: React.FC<CardWithCandleGraphProps> = ({ title, value, details, data, dataKey, colors }) => {
  return (
    <GraphCardContainer>
      {/* Título */}
      <GraphTitle>{title}</GraphTitle>

      {/* Valor Principal */}
      <GraphValue>{value}</GraphValue>

      {/* Detalhes */}
      <GraphDetails>{details}</GraphDetails>

      {/* Gráfico Responsivo */}
      <ResponsiveContainer width="100%" height={300}> {/* Altura ajustada para 300px */}
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GraphCardContainer>
  );
};

export default CardWithCandleGraph;