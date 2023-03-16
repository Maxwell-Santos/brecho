import { CartProps } from '@/interfaces/cartProps';
import ProductProps from "./ProductProps";

export default interface clienteProps {
  cart: CartProps;
  total: number;
      
  addProductToCard: (newProduct) => void | boolean;
  removeProductFromCard: (productId: string) => void | string;
  checkout: (user) => void;
}