export interface PropsModalImportProduct {
  isOpen: boolean;
  onClose: () => void;
  type?: "product" | "default";
}
