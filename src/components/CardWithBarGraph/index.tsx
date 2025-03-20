import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTitle, ColorBox } from './styles';

interface HorizontalBarChartProps {
  data: Array<{ name: string; value: number; color: string; percentage: string }>;
  title: string;
}

const HorizontalBarChartComponent: React.FC<HorizontalBarChartProps> = ({ data, title }) => {
  return (
    <ChartContainer>
      {/* Título */}
      <ChartTitle>{title}</ChartTitle>

      {/* Gráfico Responsivo */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={[{ name: '', ...data.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {}) }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          {data.map((entry, index) => (
            <Bar key={index} dataKey={entry.name} stackId="a" fill={entry.color} />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Rótulos com Caixas de Cor */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap', gap: '8px' }}>
        {data.map((entry, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ColorBox color={entry.color} />
            <span style={{ fontSize: '12px', color: '#667085' }}>{`${entry.name} - ${entry.percentage}`}</span>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
};

export default HorizontalBarChartComponent;