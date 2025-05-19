import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ReversalLayer from "../../components/sales/ReversalLayer";

const ReversalPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Estorno" />

        {/* Estorno */}
        <ReversalLayer />

      </MasterLayout>

    </>
  );
};

export default ReversalPage;
