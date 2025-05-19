import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ProductGrid from "../../components/store/ProductGrid";
import ApiLayer from "../../components/tools/ApiLayer";
import FreightLayer from "../../components/tools/FreightLayer";


const FreightPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="API" />

        {/* FreightPage */}
        <FreightLayer />

      </MasterLayout>

    </>
  );
};

export default FreightPage; 
