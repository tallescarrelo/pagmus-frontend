import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import RegisterProductSteps from "../../components/products/RegisterProductSteps";
import MasterLayout from "../../masterLayout/MasterLayout";

const RegisterProductPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Cadastrar Produto" />

        {/* MyProducts */}
        <RegisterProductSteps />
      </MasterLayout>
    </>
  );
};

export default RegisterProductPage;
