import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import AfterPayLayer from "../../components/sales/AfterPayLayer";

const AfterPayPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="AfterPayPage" />

        {/* InvoiceListLayer */}
        <AfterPayLayer />

      </MasterLayout>

    </>
  );
};

export default AfterPayPage;
