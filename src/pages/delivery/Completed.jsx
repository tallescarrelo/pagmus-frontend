import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import CompletedLayer from "../../components/delivery/CompletedLayer";

const CompletedPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Entregas finalizadas" />

        {/* InvoiceListLayer */}
        <CompletedLayer />

      </MasterLayout>

    </>
  );
};

export default CompletedPage;
