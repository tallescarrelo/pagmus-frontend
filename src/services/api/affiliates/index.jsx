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
};

export default AffiliatesServices;
