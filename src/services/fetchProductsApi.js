import axios from "axios";


const API_CONFIG = {
    BASE_URL: `${import.meta.env.VITE_API_URL}`,  
    ENDPOINTS: {
        PRODUCTS: "/obtener-productos"  
    },
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 7
};

/**
 * Obtiene productos con soporte de paginación
 * @param {number} page - Número de página actual (default: 1)
 * @param {number} limit - Número de items por página (default: 7)
 * @returns {Promise<{productos: Array, totalPages: number, currentPage: number}>}
 */
const fetchProductos = async (
    page = API_CONFIG.DEFAULT_PAGE,
    limit = API_CONFIG.DEFAULT_LIMIT
) => {
    try {
        
        const validatedPage = Math.max(1, parseInt(page));
        const validatedLimit = Math.max(1, parseInt(limit));

        
        const token = sessionStorage.getItem("token");
        if (!token) {
            throw new Error('No se encontró token de autenticación');
        }

        
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`;
        
        
        const response = await axios.get(url, {
            params: {
                page: validatedPage,
                limit: validatedLimit
            },
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            }
        });

        
        if (!response.data) {
            throw new Error('No se recibieron datos del servidor');
        }

        
        const { productos, totalPages, currentPage } = response.data;
        
        return {
            productos: productos || [],
            totalPages: totalPages || 1,
            currentPage: currentPage || validatedPage
        };

    } catch (error) {
        
        const errorDetails = {
            message: error.response?.data?.msj || error.message,
            status: error.response?.status,
            timestamp: new Date().toISOString()
        };

        console.error("Error al obtener productos:", errorDetails);

        
        if (error.response?.status === 401) {
            sessionStorage.clear();
            window.location.href = '/login';
            throw new Error('Sesión expirada o inválida');
        }

        throw new Error(`Error al obtener productos: ${errorDetails.message}`);
    }
};


export const ProductApiConfig = {
    ...API_CONFIG
};

export default fetchProductos;