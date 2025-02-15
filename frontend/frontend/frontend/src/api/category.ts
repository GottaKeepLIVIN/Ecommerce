import { Category } from "../types/category";
import { api } from "../utils/api";

export const fetchAllCategories = async () => {
    try {
        const response = await api()
            .get<Category[]>('/categories');
        console.log('axios get:', response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const addCategory = async (category: Omit<Category, '_id'>) => {
    try {
        const response = await api()
            .post('/categories', category);
        console.log('axios post:', response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const deleteCategoryById = async (catId: String) => {
    try {
        const response = await api().delete(`/categories/${catId}`);
        console.log('axios delete:', response.data);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateCategoryById = async (catId: String, category: Omit<Category, '_id'>) => {
    try {
        const response = await api().patch(`/categories/${catId}`, category);

        console.log('axios patch:', response.data);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

