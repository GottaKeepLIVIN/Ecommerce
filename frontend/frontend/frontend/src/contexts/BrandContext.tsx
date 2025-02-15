import { createContext, ReactNode, useContext, useState } from "react";
import { addBrand, deleteBrandById, fetchAllBrands, updateBrandById } from "../api/brand";
import { Brand } from "../types/brand";

type BrandState = {
    brands: Brand[]
    fetchBrands: () => void
    addNewBrand: (brand: Omit<Brand, '_id'>) => void
    deleteBrand: (brandId: string) => void
    updateBrand: (brandId: string, brand: Omit<Brand, '_id'>) => void
}

const BrandContext = createContext<BrandState | undefined>(undefined);


export const BrandProvider = ({ children }: { children: ReactNode }) => {
    const [brands, setBrands] = useState<Brand[]>([]);

    const fetchBrands = async () => {
        const brands = await fetchAllBrands();
        setBrands(brands);
    }

    const addNewBrand = async (brand: Omit<Brand, '_id'>) => {
        await addBrand(brand);
        fetchBrands()
    }

    const deleteBrand = async (brandId: string) => {
        await deleteBrandById(brandId);
        fetchBrands()
    }

    const updateBrand = async (brandId: string, brand: Omit<Brand, '_id'>) => {
        await updateBrandById(brandId, { name: brand.name })
        fetchBrands()
    }

    return <BrandContext.Provider value={{ brands, fetchBrands, addNewBrand, deleteBrand, updateBrand, }}>
        {children}
    </BrandContext.Provider>;
}

export const useBrandContext = () => {
    const context = useContext(BrandContext);
    if (!context) {
        throw new Error('useBrandContext must be used within a BrandProvider');
    }
    return context;
}