import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import MyProducts from "../../components/products/MyProducts";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useProduct } from "../../contexts/ProductContext";
import DebugLogin from "../../components/DebugLogin";

const MyProductsPage: React.FC = () => {
  const { products: myProducts, loading, error } = useProduct();

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Loja" />

        {/* Loading */}
        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-3">Carregando produtos...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {/* Debug Login */}
        <DebugLogin />
        
        {/* MyProducts */}
        {!loading && !error && <MyProducts myProducts={myProducts} />}
      </MasterLayout>
    </>
  );
};

export default MyProductsPage; 