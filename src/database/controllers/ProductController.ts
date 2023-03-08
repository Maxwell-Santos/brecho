import database from "../database"
import Product from "../models/productSchema"

//read

export const getProducts = async () => {
  await database.connect()

  if (!database.connect()) return console.error("erro na conexão com o bd")

  const products = await Product.find()
  return products
}

export const setNewProduct = async (data: any) => {
  await database.connect()

  if (!database.connect()) return console.error("erro na conexão com o bd")

  const newProduct = new Product(data)

  return await newProduct.save()
}

database.disconnect()
