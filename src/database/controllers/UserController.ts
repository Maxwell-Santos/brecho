import User from "../models/userSchema"
import database from "../database"

interface setNewUserProps {
  username: string,
  pass: string
}

//create
export const setNewUser = async (queryUser: setNewUserProps) => {
  if(!database.connect()) return console.log("erro na conexão com o bd")

  const newUser = new User(queryUser)

  return await newUser.save()
}

database.disconnect()