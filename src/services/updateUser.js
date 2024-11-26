const UpdateUserService = async (userId, formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users-update/${userId}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include', 
        });
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export default UpdateUserService;