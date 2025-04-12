import React from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import RegisterProductSteps from "../../components/products/RegisterProductSteps";
import MasterLayout from "../../masterLayout/MasterLayout";
import { selectProducts } from "../../services/reducers/products";

const RegisterProductPage = () => {
  const myProducts = useSelector(selectProducts);
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
