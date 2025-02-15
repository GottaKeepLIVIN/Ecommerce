export type Product = {
    _id: string;
    name: string;
    description: string | null;
    price: string;
    offer_price: string | null;
    stock: string;
    is_featured: boolean;
    brand: string;
    category: string;
    image: string | null;
};