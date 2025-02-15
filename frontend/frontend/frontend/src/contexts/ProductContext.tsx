import { createContext, ReactNode, useContext, useState } from "react";
import { addProduct, deleteProductById, fetchAllProducts, updateProductById } from "../api/product";
import { Product } from "../types/product";

type ProductState = {
    products: Product[]
    fetchProducts: () => void
    addNewProduct: (product: Omit<Product, '_id'>) => void
    deleteProduct: (prodId: string) => void
    updateProduct: (prodId: string, product: Omit<Product, '_id'>) => void
}

const ProductContext = createContext<ProductState | undefined>(undefined);


export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setproducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const products = await fetchAllProducts();
        setproducts(products);
    }

    const addNewProduct = async (product: Omit<Product, '_id'>) => {
        await addProduct(product);
        fetchProducts()
    }

    const deleteProduct = async (prodId: string) => {
        await deleteProductById(prodId);
        fetchProducts()
    }

    const updateProduct = async (prodId: string, product: Omit<Product, '_id'>) => {
        await updateProductById(prodId, { ...product })
        fetchProducts()
    }

    return <ProductContext.Provider value={{ products, fetchProducts, addNewProduct, deleteProduct, updateProduct, }}>
        {children}
    </ProductContext.Provider>;
}

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductContext');
    }
    return context;
}