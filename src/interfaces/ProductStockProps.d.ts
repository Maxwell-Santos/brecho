export default interface ProductToBuyProps{
  name: string,
  price: number,
  description: number,
  quant: number, //estoque
  _id: string,
  isFavorite?: boolean
}