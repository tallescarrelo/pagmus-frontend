export interface PropsButton {
  label: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  onClick?: () => void;
  iconLeft?: string;
  iconRight?: string;
  active?: boolean;
}
