import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { GraphCardContainer, GraphTitle, GraphValue, GraphDetails } from './styles';
import { CardWithLineGraphProps } from './types';

const CardWithLineGraph: React.FC<CardWithLineGraphProps> = ({ title, value, details, data, dataKey, stroke }) => {
  return (
    <GraphCardContainer>
      <GraphTitle>{title}</GraphTitle>
      <GraphValue>{value}</GraphValue>
      <GraphDetails>{details}</GraphDetails>
      <ResponsiveContainer width="100%" height={400}>
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

export default CardWithLineGraph;
