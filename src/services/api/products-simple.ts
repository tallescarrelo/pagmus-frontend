import apiService from "./index";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  status: 'active' | 'inactive';
  user_id: number;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

interface ProductPayload {
  name: string;
  description: string;
  price: number;
  image?: string;
  [key: string]: any;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const ProductsServicesSimple = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiService.get<ApiResponse<Product[]>>("/api/products");
      return response.data.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.getProducts:", error);
      throw error;
    }
  },

  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await apiService.get<ApiResponse<Product>>(`/api/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.getProductById:", error);
      throw error;
    }
  },

  registerProduct: async (payload: ProductPayload): Promise<ApiResponse<Product>> => {
    try {
      const response = await apiService.post<ApiResponse<Product>>("/api/products", payload);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.registerProduct:", error);
      throw error;
    }
  },

  updateProduct: async (id: number, payload: Partial<ProductPayload>): Promise<ApiResponse<Product>> => {
    try {
      const response = await apiService.put<ApiResponse<Product>>(`/api/products/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.updateProduct:", error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<ApiResponse<any>> => {
    try {
      const response = await apiService.delete<ApiResponse<any>>(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in ProductsServiceSimple.deleteProduct:", error);
      throw error;
    }
  },
};

export default ProductsServicesSimple; 