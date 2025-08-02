import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PendingLayer from "../../components/delivery/PendingLayer";

const Pending: React.FC = () => {
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