import axios from "axios";

const api = axios.create({
  baseURL: "https://syspay-production.up.railway.app",
});

const AccountService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Error in Account.login:", error);
      throw error;
    }
  },

  register: async ({ name, email, password }) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  },
};

export default AccountService;
