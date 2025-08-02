import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import ForwardedLayer from "../../components/delivery/ForwardedLayer";

const Forwarded: React.FC = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Entregas encaminhadas" />

        {/* ForwardedLayer */}
        <ForwardedLayer />
      </MasterLayout>
    </>
  );
};

export default Forwarded; 