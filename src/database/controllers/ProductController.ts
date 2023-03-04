import database from "../database"
import Product from "../models/productSchema"

//read
export const getProducts = async () => {
  if(!database.connect()) return console.log("erro na conexão com o bd")

  const products = Product.find()

  return await products
}

database.disconnect()
