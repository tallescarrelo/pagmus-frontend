export interface PropsInput {
  label?: string;
  placeholder?: string;
  type?: "text" | "password";
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconPassword?: string;
  mb?: number;
  mt?: number;
}
