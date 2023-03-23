import CartProps from '@/interfaces/cartProps';
import ProductProps from '@/interfaces/ProductStockProps';
import User from "../models/userSchema"
import database from "../database"

interface UserProps {
  email: string,
  pass?: string,
  cart: { date: string, items: ProductProps[] }[]
}

//create
export const setNewUser = async (queryUser: UserProps) => {
  await database.connect()
  if (!database.connect()) return console.log("erro na conexão com o bd")

  const statusUser = await User.findOne({email:`${queryUser.email}`})
  .then((response) => {
    // o response pode vir null ou com um objeto do usuário
    if(response == null){
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

  const userBD = await User.findOne({email: `${user.email}`})

  const findUser = await User.findOneAndUpdate(
    {email: `${user.email}`},
    {cart: [...userBD.cart, newCart]},

    {new: true}
  )

  return await findUser
}

database.disconnect()