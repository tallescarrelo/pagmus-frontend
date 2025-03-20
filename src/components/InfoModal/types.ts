import { ReactNode } from "react";

export interface InfoModalProps {
  name: ReactNode;
  status: "Ativo" | "Inativo" | "Sem Estoque";
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
