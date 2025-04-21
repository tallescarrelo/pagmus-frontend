import apiService from "..";

const UserServices = {
  updateUser: async (payload) => {
    try {
      const response = await apiService.patch("/user", payload);
      return response.data;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    }
  },
};

export default UserServices;
