import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import InvoiceListLayer from "../../components/sales/InvoiceListLayer";
import ChurnLayer from "../../components/sales/ChurnLayer";
import AbandonLayer from "../../components/sales/AbandonLayer";

const AbandonPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Listagem de Abandono" />

        {/* InvoiceListLayer */}
        <AbandonLayer />

      </MasterLayout>

    </>
  );
};

export default AbandonPage;
