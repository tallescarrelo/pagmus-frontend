export interface CardWithPieGraphProps {
    title: string;
    subtitle: string;
    data: Array<{ name: string; value: number; color: string }>;
    dataKey: string;
    innerRadius?: number;
  }
  