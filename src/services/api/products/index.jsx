import apiService from "..";

const ProductsServices = {
  getProducts: async () => {
    try {
      console.log("🔍 ProductsService - Iniciando requisição...");
      const response = await apiService.get("/api/products");
      console.log("✅ ProductsService - Resposta recebida:", response.data);
      return response.data.data; // Retorna apenas os dados do array
    } catch (error) {
      console.error("❌ Error in getProducts:", error);
      console.error("❌ Error details:", error.response?.data);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await apiService.get(`/api/products/${id}`);
      return response.data.data; // Retorna apenas os dados do produto
    } catch (error) {
      console.error("Error in getProductById:", error);
      throw error;
    }
  },

  registerProduct: async (payload) => {
    try {
      const response = await apiService.post("/api/products", payload);
      return response.data;
    } catch (error) {
      console.error("Error in registerProduct:", error);
      throw error;
    }
  },

  updateProduct: async (id, payload) => {
    try {
      const response = await apiService.put(`/api/products/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await apiService.delete(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      throw error;
    }
  },
};

export default ProductsServices;
