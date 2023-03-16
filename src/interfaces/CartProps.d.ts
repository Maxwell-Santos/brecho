import { ProductToBuyProps } from '@/interfaces/ProductToBuyProps';

export default interface CartProps {
  date: Date | string;
  items: ProductToBuyProps[];
  total: number | undefined;
}