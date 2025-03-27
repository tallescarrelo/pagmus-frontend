import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import MyAffiliateProducts from "../../components/affiliate/MyAffiliateProducts";

const MyAffiliateProductsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Produtos afiliados" />

        {/* MyAffiliateProducts */}
        <MyAffiliateProducts/>

      </MasterLayout>

    </>
  );
};

export default MyAffiliateProductsPage;
