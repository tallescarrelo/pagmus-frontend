export interface PropsSelectInput {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}
