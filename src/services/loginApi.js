import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        withCredentials: true,
      });
      sessionStorage.setItem("userData", JSON.stringify(response.data)); 
      sessionStorage.setItem("token", "true")
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error en el intento de login" };
    }
  },

  verifyToken: async () => {
    try {
      const response = await axios.get(`${API_URL}/verify-token`, {
        withCredentials: true,
      });
      sessionStorage.setItem("userData", JSON.stringify(response.data));
      sessionStorage.setItem("token", "true") 
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error al verificar el token" };
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        withCredentials: true,
      });
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem()
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
};

export default authService;
