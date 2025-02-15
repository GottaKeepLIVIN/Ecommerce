import { createContext, ReactNode, useContext, useState } from "react";
import { addCategory, deleteCategoryById, fetchAllCategories, updateCategoryById } from "../api/category";
import { Category } from "../types/category";

type CategoryState = {
    categories: Category[]
    fetchCategories: () => void
    addNewCategory: (category: Omit<Category, '_id'>) => void
    deleteCategory: (catId: string) => void
    updateCategory: (catId: string, Category: Omit<Category, '_id'>) => void
}

const CategoryContext = createContext<CategoryState | undefined>(undefined);


export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setcategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const categories = await fetchAllCategories();
        setcategories(categories);
    }

    const addNewCategory = async (category: Omit<Category, '_id'>) => {
        await addCategory(category);
        fetchCategories()
    }

    const deleteCategory = async (catId: string) => {
        await deleteCategoryById(catId);
        fetchCategories()
    }

    const updateCategory = async (catId: string, category: Omit<Category, '_id'>) => {
        await updateCategoryById(catId, { name: category.name })
        fetchCategories()
    }

    return <CategoryContext.Provider value={{ categories, fetchCategories, addNewCategory, deleteCategory, updateCategory, }}>
        {children}
    </CategoryContext.Provider>;
}

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryContext');
    }
    return context;
}