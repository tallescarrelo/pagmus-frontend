import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ProductGrid from "../../components/store/ProductGrid";


const ProductGridPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Loja" />

        {/* ProductGrid */}
        <ProductGrid />

      </MasterLayout>

    </>
  );
};

export default ProductGridPage; 
