import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import MyProducts from "../../components/products/MyProducts";
import MasterLayout from "../../masterLayout/MasterLayout";
import ProductsServices from "../../services/api/products";

const MyProductsPage = () => {
  const [myProducts, setMyProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await ProductsServices.getProducts();
      setMyProducts(response);
    } catch (error) {
      console.error("Error in getProducts:", error);
    }
  }, []);

  useEffect(() => {
    getProducts();
  });

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
