import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import MyAffiliateProducts from "../../components/affiliate/MyAffiliateProducts";

const MyAffiliateProductsPage = () => {
  return (
    <>
      {/* MasterLayout */}

      {/* Breadcrumb */}
      <Breadcrumb title="Produtos afiliados" />

      {/* MyAffiliateProducts */}
      <MyAffiliateProducts />
    </>
  );
};

export default MyAffiliateProductsPage;
