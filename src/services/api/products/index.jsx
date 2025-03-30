import apiService from "..";

const ProductsServices = {
  getProducts: async () => {
    try {
      const response = await apiService.get("/product");
      return response.data;
    } catch (error) {
      console.error("Error in getAffiliates:", error);
      throw error;
    }
  },
};

export default ProductsServices;
