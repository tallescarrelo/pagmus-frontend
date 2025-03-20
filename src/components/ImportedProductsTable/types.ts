export interface ImportedProductData {
    image: string;
    name: string;
    status: "Ativo" | "Inativo" | "Sem estoque",
    stock: string;
    salesChannels: number;
    markets: number;
    category: string;
    supplier: string;
  }
  