const API_URL = 'http://localhost:2020/api/recepies';


export const fetchRecepieById = async (id) => {
    try {
        const response = await fetch(API_URL + "/" + id);
        if (!response.ok) {
            throw new Error(`An error has occurred: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recepies:', error);
        throw error;
    }
};

export const fetchAllRecepies = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`An error has occurred: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recepies:', error);
        throw error;
    }
};

export const deleteRecepie = async (recipeId) => {
    try {
        const response = await fetch(`${API_URL}/${recipeId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`An error has occurred: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error deleting recipe:', error);
        throw error;
    }
};

export const addRecepie = async (formData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};
