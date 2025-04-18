import apiService from "..";

const AffiliatesServices = {
  getAffiliates: async () => {
    try {
      const response = await apiService.get("/affiliation/affiliates");
      return response.data;
    } catch (error) {
      console.error("Error in getAffiliates:", error);
      throw error;
    }
  },

  getAffiliatesProducts: async () => {
    try {
      const response = await apiService.get("/affiliation/products");
      return response.data;
    } catch (error) {
      console.error("Error in getAffiliatesProducts:", error);
      throw error;
    }
  },

  getAffiliatesPending: async () => {
    try {
      const response = await apiService.get("/affiliation/pending");
      return response.data;
    } catch (error) {
      console.error("Error in getAffiliatesPending:", error);
      throw error;
    }
  },

  acceptAffiliate: async (affiliateId) => {
    try {
      const response = await apiService.post(
        `/affiliation/accept/${affiliateId}`
      );
      return response.data;
    } catch (error) {
      console.error("error in accept affiliate");
    }
  },
};

export default AffiliatesServices;
