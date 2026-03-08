export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'women' | 'men' | 'kids' | 'accessories';
  image: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  address: Address;
}
