import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { GraphCardContainer, GraphTitle, GraphValue,} from './styles';
import { CardWithPieGraphProps } from './types';

const CardWithPieGraph: React.FC<CardWithPieGraphProps> = ({ title, subtitle, data, dataKey, innerRadius }) => {
  return (
    <GraphCardContainer>
      <GraphTitle>{title}</GraphTitle>
      <GraphValue>{subtitle}</GraphValue>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius || 0} 
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => entry.percentage ? `${entry.name}: ${entry.percentage}` : `${entry.name}`} >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </GraphCardContainer>
  );
};

export default CardWithPieGraph;
