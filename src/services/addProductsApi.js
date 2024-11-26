let urlBase = `${import.meta.env.VITE_API_URL}/crear-producto`;

const AgregarProductos = async (formData) => {
    try {
        const response = await fetch(urlBase, {
            method: 'POST',
            body: formData, 
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        return response;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
};

export default AgregarProductos;
