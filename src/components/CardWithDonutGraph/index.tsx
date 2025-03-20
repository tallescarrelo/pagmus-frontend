import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { GraphCardContainer, GraphTitle, GraphValue } from './styles';

const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#000000'];

interface CardWithDonutGraphProps {
  title: string;
  value: string;
  data: any[]; // Dados do gráfico
  dataKey: string; // Chave dos dados para o gráfico
}

const CardWithDonutGraph: React.FC<CardWithDonutGraphProps> = ({ title, value, data, dataKey }) => {
  return (
    <GraphCardContainer>
      {/* Título */}
      <GraphTitle>{title}</GraphTitle>

      {/* Valor Principal */}
      <GraphValue>{value}</GraphValue>

      {/* Gráfico Responsivo */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60} // Aumentado para melhor proporção
            outerRadius={90} // Aumentado para melhor proporção
            fill="#8884d8"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </GraphCardContainer>
  );
};

export default CardWithDonutGraph;