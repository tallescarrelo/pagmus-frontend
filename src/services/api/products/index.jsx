import apiService from "..";

const ProductsServices = {
  getProducts: async () => {
    try {
      const response = await apiService.get("/product");
      return response.data;
    } catch (error) {
      console.error("Error in getProducts:", error);
      throw error;
    }
  },

  registerProduct: async (payload) => {
    try {
      await apiService.post("/product", payload);
    } catch (error) {
      console.error("Error in registerProduct:", error);
      throw error;
    }
  },
};

export default ProductsServices;
