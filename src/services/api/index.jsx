import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  get(url, config = {}) {
    return this.api.get(url, config);
  }

  post(url, data, config = {}) {
    return this.api.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.api.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.api.delete(url, config);
  }
}


const apiService = new ApiService();
export default apiService;
