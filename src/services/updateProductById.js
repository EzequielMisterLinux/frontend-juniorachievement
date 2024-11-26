import axios from "axios";

const urlBase = `${import.meta.env.VITE_API_URL}/actualizar-productos`;

const updateProductById = async (id, formData) => {
    try {

        if (formData.has('disponibilidad')) {
            const disponibilidad = formData.get('disponibilidad');
            formData.set('disponibilidad', String(disponibilidad));
        }


        if (formData.has('imagen') && !formData.get('imagen').name) {
            formData.delete('imagen');
        }

        const response = await axios.put(`${urlBase}/${id}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            },

            timeout: 30000,
            maxContentLength: 10000000 
        });

        if (!response.data) {
            throw new Error('No se recibió respuesta del servidor');
        }

        return response.data;
    } catch (error) {
        if (error.response) {

            throw new Error(error.response.data.msg || 'Error en la respuesta del servidor');
        } else if (error.request) {

            throw new Error('No se recibió respuesta del servidor');
        } else {

            throw new Error('Error al configurar la petición');
        }
    }
};

export default updateProductById;