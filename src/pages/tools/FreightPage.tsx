import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import FreightLayer from "../../components/tools/FreightLayer";

const FreightPage: React.FC = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="API" />

        {/* FreightPage */}
        <FreightLayer />
      </MasterLayout>
    </>
  );
};

export default FreightPage; 