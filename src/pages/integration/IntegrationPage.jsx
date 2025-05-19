import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import IntegrationLayer from "../../components/integration/IntegrationLayer";


const IntegrationPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Integração" />

        {/* IntegrationPage */}
        <IntegrationLayer />

      </MasterLayout>

    </>
  );
};

export default IntegrationPage; 
