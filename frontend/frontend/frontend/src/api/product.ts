import { api } from "../utils/api";

export const fetchAllProducts = async () => {
    try {
        const response = await api()
            .get<Product[]>('/products');
        console.log('axios get:', response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const addProduct = async (product: Omit<Product, '_id'>) => {
    try {
        const response = await api()
            .post('/products', product);
        console.log('axios post:', response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const deleteProductById = async (prodId: String) => {
    try {
        const response = await api().delete(`/products/${prodId}`);
        console.log('axios delete:', response.data);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateProductById = async (prodId: String, prod: Omit<Product, '_id'>) => {
    try {
        const response = await api().patch(`/products/${prodId}`, prod);

        console.log('axios patch:', response.data);
    } catch (error) {
        console.log(error)
        throw error;
    }
}
