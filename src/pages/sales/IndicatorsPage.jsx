import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import IndicatorsLayer from "../../components/sales/IndicatorsLayer";

const IndicatorsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Estorno" />

        {/* IndicatorsPage */}
        <IndicatorsLayer />

      </MasterLayout>

    </>
  );
};

export default IndicatorsPage;
