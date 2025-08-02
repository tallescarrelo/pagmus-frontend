import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ApiLayer from "../../components/tools/ApiLayer";

const ApiPage: React.FC = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="API" />

        {/* Api */}
        <ApiLayer />
      </MasterLayout>
    </>
  );
};

export default ApiPage; 