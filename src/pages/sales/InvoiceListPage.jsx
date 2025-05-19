import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import InvoiceListLayer from "../../components/sales/InvoiceListLayer";

const InvoiceListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Vendas" />

        {/* InvoiceListLayer */}
        <InvoiceListLayer />

      </MasterLayout>

    </>
  );
};

export default InvoiceListPage;
