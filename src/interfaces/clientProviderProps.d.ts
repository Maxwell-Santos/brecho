import ProductProps from "./ProductProps";

export default interface clienteProps {
  cart: ProductProps[];
  total: number;
      
  addProductToCard: (newProduct) => void | boolean;
  removeProductFromCard: (productId: string) => void | string;
  checkout: () => void;
}