import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

console.log("API URL:", process.env.REACT_APP_API_URL || "http://localhost:3001");

const AccountService = {
  login: async (credentials) => {
    try {
      console.log("Tentando fazer login com:", credentials);
      const response = await api.post("/api/auth/login", credentials);
      console.log("Resposta do login:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in Account.login:", error);
      throw error;
    }
  },

  register: async ({ name, email, password, userImg, phone, cpf }) => {
    try {
      const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
        userImg,
        phone,
        cpf,
      });
      return response.data;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  },
};

export default AccountService;
