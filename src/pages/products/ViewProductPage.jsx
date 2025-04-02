import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ViewProduct from "../../components/products/ViewProduct";

const ViewProductPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Meu produto" />

        {/* ViewProduct */}
        <ViewProduct />

      </MasterLayout>

    </>
  );
};

export default ViewProductPage; 
