import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import AffiliatesOfMyProducts from "../../components/affiliate/AffiliatesOfMyProducts";
import MasterLayout from "../../masterLayout/MasterLayout";
import apiService from "../../services/api";

const AffiliatesOfMyProductsPage = () => {
  const [affiliates, setAffiliates] = useState([]);

  const getAffiliates = async () => {
    try {
      const { data } = await apiService.get("/affiliation/affiliates");
      setAffiliates(data);
    } catch (error) {
      console.error("Error in getAffiliates:", error);
      throw error;
    }
  };

  useEffect(() => {
    getAffiliates();
  }, []);

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Meus afiliados" />

        {/* AffiliatesOfMyProducts */}
        <AffiliatesOfMyProducts affiliates={affiliates} />
      </MasterLayout>
    </>
  );
};

export default AffiliatesOfMyProductsPage;
