export interface CardWithBarGraphProps {
    title: string;
    subtitle: string;
    data: Array<{ name: string; value: number; percentage: string; color: string }>;
  }