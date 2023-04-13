import ProductToBuyProps from '@/interfaces/ProductStockProps';
import database from "../database"
import User from "../models/userSchema"
import { getUser } from './UserController'

//read
export const getFavoriteProducts = async (email: string) => {
  await database.connect()

  if (!database.connect()) return console.error("erro na conexão com o bd")

  const user = await getUser(email)

  return await user.favorites
}

//create
export const setNewFavoriteProduct = async (email: string, product: ProductToBuyProps ) => {
  await database.connect()

  if (!database.connect()) return console.error("erro na conexão com o bd")

  const userBD = await User.findOne({ email: `${email}` })

  const findUser = await User.findOneAndUpdate(
    { email: `${email}` },
    { favorites: [product, ...userBD.favorites] },

    { new: true }
  )

  return await findUser.favorites
}

export const deleteFavoriteProduct = async (email: string, productId: string) => {
  await database.connect()

  if (!database.connect()) return console.error("erro na conexão com o bd")

  const userBD = await User.findOneAndUpdate(
    { email: email },
    {$pull: {favorites: { $elementMatch: {_id: productId}}}}
  )

  return await userBD.favorites
}

database.disconnect()
