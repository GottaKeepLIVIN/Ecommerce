import { Brand } from "../types/brand";
import { api } from "../utils/api";

export const fetchAllBrands = async () => {
    try {
        const response = await api()
            .get<Brand[]>('/brands');
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }

};

export const addBrand = async (brand: Omit<Brand, '_id'>) => {
    try {
        const response = await api()
            .post('/brands', brand);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const deleteBrandById = async (brandId: String) => {
    try {
        const response = await api().delete(`/brands/${brandId}`);
        console.log('axios delete:', response.data);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateBrandById = async (brandId: String, brand: Omit<Brand, '_id'>) => {
    try {
        const response = await api().patch(`/brands/${brandId}`, brand);

        console.log('axios patch:', response.data);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

