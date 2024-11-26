import axios from "axios";

const deleteProductByID = async (id) => {
    
    try {
        
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/borrar-productos/${id}`,{
            withCredentials: true,
          })

        return await response.data

    } catch (error) {
        console.error(error);
        
    }

}

export default deleteProductByID