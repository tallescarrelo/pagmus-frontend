import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import AffiliatesOfMyProducts from "../../components/affiliate/AffiliatesOfMyProducts";

const AffiliatesOfMyProductsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Meus afiliados" />

        {/* AffiliatesOfMyProducts */}
        <AffiliatesOfMyProducts/>

      </MasterLayout>

    </>
  );
};

export default AffiliatesOfMyProductsPage;
