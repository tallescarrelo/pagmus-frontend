import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import InvoiceListLayer from "../../components/sales/InvoiceListLayer";
import PendingPage from "./Completed";
import PendingLayer from "../../components/delivery/PendingLayer";

const Pending = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Entregas pendentes" />

        {/* InvoiceListLayer */}
        <PendingLayer />

      </MasterLayout>

    </>
  );
};

export default Pending;
