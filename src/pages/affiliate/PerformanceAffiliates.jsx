import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import MasterLayout from "../../masterLayout/MasterLayout";
import PerformanceAffiliatesLayer from "../../components/affiliate/PerformanceAffiliatesLayer";

const PerformanceAffiliates = () => {

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Desempenho de afiliados" />

        {/* Perfomance Affiliate */}
        <PerformanceAffiliatesLayer />

        
      </MasterLayout>
    </>
  );
};

export default PerformanceAffiliates;
