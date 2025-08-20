export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  category?: string;
  price_bulk: number;
  description: string;
}
