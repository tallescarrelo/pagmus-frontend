import apiService from "..";

const SalesServices = {
  getMySales: async () => {
    try {
      const response = await apiService.get("/sale/owner");
      return response.data;
    } catch (error) {
      console.error("Error in getMySales:", error);
      throw error;
    }
  },
};

export default SalesServices;
