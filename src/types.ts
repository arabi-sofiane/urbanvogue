export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sizes: string[];
  images: string[];
  description: string;
  colors: string[];
  stock: number;
  slug: string;
  tags: string[];
  featured: boolean;
  category: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  discount?: string;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + color)
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
