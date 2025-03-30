import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import MyProducts from "../../components/products/MyProducts";


const MyProductsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Loja" />

        {/* MyProducts */}
        <MyProducts />

      </MasterLayout>

    </>
  );
};

export default MyProductsPage; 
