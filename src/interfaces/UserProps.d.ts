export default interface UserProps {
  email: string,
  pass?: string,
  cart: { date: string, items: ProductProps[] }[],
  favorites: []
}
