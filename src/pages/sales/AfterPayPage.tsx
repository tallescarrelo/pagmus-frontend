import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import AfterPayLayer from "../../components/sales/AfterPayLayer";

const AfterPayPage: React.FC = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="After Pay" />

        {/* InvoiceListLayer */}
        <AfterPayLayer />
      </MasterLayout>
    </>
  );
};

export default AfterPayPage; 