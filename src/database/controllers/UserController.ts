import ProductProps from '@/interfaces/ProductToBuyProps';
import CartProps from '@/interfaces/CartProps'
import User from "../models/userSchema"
import Product from "../models/productSchema"
import database from "../database"
import UserProps from '@/interfaces/UserProps'

//create
export const setNewUser = async (queryUser: UserProps) => {
  await database.connect()
  if (!database.connect()) return console.log("erro na conexão com o bd")

  const statusUser = await User.findOne({ email: `${queryUser.email}` })
    .then((response) => {
      // o response pode vir null ou com um objeto do usuário
      if (response == null) {
        const newUser = new User(queryUser)
        return newUser.save()
      }
      else {
        return response
      }
    })
    .catch((error) => {
      console.error(error)
    })

  return await statusUser
}

//create
export const setNewBuy = async (user: UserProps, newCart: CartProps) => {
  await database.connect()
  if (!database.connect()) return console.log("erro na conexão com o bd")

  const userBD = await User.findOne({ email: `${user.email}` })

  function updateProductStock() {
    newCart.items.map(async (product: ProductProps) => {
      const productBeforeBuy = await Product.findOne({ _id: product._id })

      await Product.updateOne(
        { _id: product._id },
        { $set: { quant: productBeforeBuy.quant - product.quantity } }
      )
    })
  }
  updateProductStock()

  const findUser = await User.findOneAndUpdate(
    { email: `${user.email}` },
    { cart: [...userBD.cart, newCart] },
    { new: true } //serve para retornar o item
  )

  return await findUser
}

export const getUser = async (userEmail: string) => {
  await database.connect()
  if (!database.connect()) return console.log("erro na conexão com o bd")

  const userData = await User.findOne({ email: `${userEmail}` })

  return await userData
}

database.disconnect()