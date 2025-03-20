export interface PropsButtonLarge {
  label: string;
  onClick?: (credentials: { email: string, password: string }) => void;
  mb?: number;
  mt?: number;
}
