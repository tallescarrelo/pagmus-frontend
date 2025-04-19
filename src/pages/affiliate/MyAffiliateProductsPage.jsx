import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import MyAffiliateProducts from "../../components/affiliate/MyAffiliateProducts";
import MasterLayout from "../../masterLayout/MasterLayout";
import AffiliatesServices from "../../services/api/affiliates";

const MyAffiliateProductsPage = () => {
  const [affiliates, setAffiliates] = useState([]);

  const getAffiliatesPending = async () => {
    try {
      const response = await AffiliatesServices.getAffiliatesPending();
      setAffiliates(response);
    } catch (error) {
      console.error("Error in getAffiliates:", error);
      throw error;
    }
  };

  const handleAccceptAffiliate = async (affiliateId) => {
    try {
      const response = await AffiliatesServices.acceptAffiliate(affiliateId);
    } catch (error) {
      console.error("Error in handleAccceptAffiliate:", error);
    }
  };

  useEffect(() => {
    getAffiliatesPending();
  }, []);
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Produtos afiliados" />

        {/* MyAffiliateProducts */}
        <MyAffiliateProducts
          affiliates={affiliates}
          handleAccceptAffiliate={handleAccceptAffiliate}
        />
      </MasterLayout>
    </>
  );
};

export default MyAffiliateProductsPage;
