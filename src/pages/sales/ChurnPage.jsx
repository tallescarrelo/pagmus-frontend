import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ChurnLayer from "../../components/sales/ChurnLayer";

const ChurnPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Churn Rate" />

        {/* InvoiceListLayer */}
        <ChurnLayer />

      </MasterLayout>

    </>
  );
};

export default ChurnPage;
