import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import BanksLayer from "../../components/banks/BanksLayer";

const BanksPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Meus bancos" />

        {/* InvoiceListLayer */}
        <BanksLayer />

      </MasterLayout>

    </>
  );
};

export default BanksPage;
