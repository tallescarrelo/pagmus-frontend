import React from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import MyProducts from "../../components/products/MyProducts";
import MasterLayout from "../../masterLayout/MasterLayout";
import { selectProducts } from "../../services/reducers/products";

const MyProductsPage = () => {
  const myProducts = useSelector(selectProducts);
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Loja" />

        {/* MyProducts */}
        <MyProducts myProducts={myProducts} />
      </MasterLayout>
    </>
  );
};

export default MyProductsPage; 
