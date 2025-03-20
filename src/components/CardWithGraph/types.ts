export interface CardWithGraphProps {
  title: string;
  value: string;
  change: string;
  details: string;
  data: Array<{ name: string; [key: string]: number }>;
  dataKey: string;
  stroke: string;
}
