import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import ViewProductAffiliate from "../../components/products/ViewProductAffiliate";
import MasterLayout from "../../masterLayout/MasterLayout";
import AffiliatesServices from "../../services/api/affiliates";

interface AffiliateProduct {
  id: number;
  product: {
    id: number;
    name: string;
    image_url?: string;
    category?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const ProductsAffiliates: React.FC = () => {
  const [affiliatesProducts, setAffiliatesProducts] = useState<AffiliateProduct[]>();

  const getAffiliatesProducts = async (): Promise<void> => {
    try {
      const response = await AffiliatesServices.getAffiliates();
      setAffiliatesProducts(response);
    } catch (error) {
      console.error("Error in getAffiliatesProducts:", error);
    }
  };

  useEffect(() => {
    getAffiliatesProducts();
  }, []);

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Produtos afiliados" />

        {/* ViewProduct */}
        <ViewProductAffiliate affiliatesProducts={affiliatesProducts} />
      </MasterLayout>
    </>
  );
};

export default ProductsAffiliates; 