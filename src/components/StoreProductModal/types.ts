export interface StoreProductModalProps {
    imageUrl: string;
    productName: string;
    category: string;
    productLink: string;
    description: string;
    totalValue: string;
    taxes?: string;
    clientName: string;
    clientCPF: string;
    clientEmail: string;
    clientPhone: string;
    paymentMethod: string;
    deliveryTime: string;
    onPromote?: () => void;
  }

  
  