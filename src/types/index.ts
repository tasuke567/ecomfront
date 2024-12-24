export interface Product {
    id: string | number;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    // Add other fields your product might have, such as:
    stock?: number;
    rating?: number;
    brand?: string;
  }