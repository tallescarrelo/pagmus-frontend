import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import WithdrawalsLayer from "../../components/banks/WithdrawalsLayer";

const Withdrawals: React.FC = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Meus saques" />

        {/* InvoiceListLayer */}
        <WithdrawalsLayer />
      </MasterLayout>
    </>
  );
};

export default Withdrawals; 