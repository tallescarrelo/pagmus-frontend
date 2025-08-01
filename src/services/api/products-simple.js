import apiService from "../index";

const ProductsServicesSimple = {
  getProducts: async () => {
    try {
      const response = await apiService.get("/api/products");
      return response.data.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.getProducts:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await apiService.get(`/api/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.getProductById:", error);
      throw error;
    }
  },

  registerProduct: async (payload) => {
    try {
      const response = await apiService.post("/api/products", payload);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.registerProduct:", error);
      throw error;
    }
  },

  updateProduct: async (id, payload) => {
    try {
      const response = await apiService.put(`/api/products/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.updateProduct:", error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await apiService.delete(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.deleteProduct:", error);
      throw error;
    }
  },
};

export default ProductsServicesSimple; 