import ProductToBuyProps from '@/interfaces/ProductToBuyProps';
import { CartProps } from '@/interfaces/cartProps';
import ProductProps from "./ProductProps";

export default interface clienteProps {
  cart: CartProps;
  total: number;
  favorites: ProductToBuyProps[];
      
  addProductToCart: (newProduct) => void | boolean;
  removeProductFromCart: (productId: string) => void | string;
  
  addProductFavorite: (productId: string) => void | string;
  removeProductFavorite: (productId: string) => void;
  productIsFavorite: (productId: string) => boolean;

  updateQuantityProduct: (id: string, newQuantity: number) => void;
  checkout: (user) => Promise;
  cleanCart: () => void;
}